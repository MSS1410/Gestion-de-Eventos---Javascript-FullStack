import { request } from '../../services/api'
import { navigate } from '../../app'
import getUserFromToken from '../../app'
import './MyProfile.css'
import Swal from 'sweetalert2'
import HeaderApp from '../../components/header/headerApp/HeaderApp'
import FooterAuth from '../../components/footer/footerAuth/footerAuth'

export default function Profile() {
  const mainRoot = document.getElementById('main-root')
  mainRoot.className = ''

  const user = getUserFromToken()

  document.getElementById('header-root').innerHTML = HeaderApp(user)
  document.getElementById('footer-root').innerHTML = FooterAuth()

  // fetch de datos

  loadUser()

  async function loadUser() {
    try {
      const userInfo = await request('/users/myProfile')
      render(userInfo)
    } catch (error) {
      mainRoot.innerHTML = `<p class="error">Can't load your profile.</p>`
    }
  }

  // renderizado
  function render(user) {
    mainRoot.innerHTML = `

    <div class="profile-container">
      <h1 class="profile-title">My Space</h1>

      <div class="profile-grid">
        <!-- left: info usuario -->

        <div class="profile-info">

          <div class="avatar-wrapper">
            <img
              src="${user.avatarLink || '/icons/noUser.jpg'}"
              alt="Avatar de ${user.name}"
              class="avatar-display"
            />
          </div>

          <div class="info-title">
            <label>Name</label>
            <div class="info-info">${user.name}</div>
          </div>

          <div class="info-title">
            <label>E-mail</label>
            <div class="info-info">${user.email}</div>
          </div>

          <div class="info-title">
            <label>Descripción</label>
            <div class="info-info">${user.description || '—'}</div>
          </div>
        </div>

        <button id="deleteAccount" class="btn delete-account"> Delete your account </button>

        <!-- right: edicion del usuario -->

        <form
          id="profileForm"
          data-user-id="${user._id}"
          enctype="multipart/form-data"
          class="profile-form"
        >
          <div class="form-title">
            <label>New Name</label>
            <input name="name" type="text" placeholder="${user.name}" />
          </div>
          <div class="form-title">
            <label>New E-mail</label>
            <input name="email" type="email" placeholder="${user.email}" />
          </div>
          <div class="form-title">
            <label>New Password</label>
            <input name="password" type="password" placeholder="········" />
          </div>
          <div class="form-title">
            <label>Repeat Password</label>
            <input name="password2" type="password" placeholder="········" />
          </div>

          <div class="form-title">
          <label>Description</label>
          <input name="description" type="text" placeholder="Add a description of yourself." />
        </div>

          <div class="form-title inputImg">
            <label>Avatar</label>
            <input name="avatar" type="file" accept="image/*" />
          </div>

       

          <div class="buttons-form">
          <button id="backButton" class="btn btn-back">Back</button>
            <button type="submit" class="btn btn-save">Save Changes</button>
           
          </div>
        </form>
      </div>

    
    </div>
  `

    // añado clicks en buttons

    document.getElementById('profileForm').addEventListener('submit', onSubmit)

    // limpiar input de descripcion

    const descInput = document.querySelector('input[name="description"]')
    if (descInput) {
      descInput.addEventListener('blur', () => {
        if (!descInput.value.trim()) {
          descInput.value = ''
          descInput.placeholder = '-'
        }
      })
    }

    document
      .getElementById('backButton')
      .addEventListener('click', () => navigate('/dashboard'))

    //boton para self destruction

    const deleteAccount = document.getElementById('deleteAccount')
    if (deleteAccount) {
      deleteAccount.addEventListener('click', async () => {
        const { isConfrimed } = await Swal.fire({
          title: 'Your account will be deleted permanently',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, proceed',
          cancelButtonText: 'No, cancel'
        })
        if (!isConfrimed) {
          await request('/users/myProfile', {
            method: 'DELETE'
          })
          localStorage.removeItem('token')
          navigate('/login')
        }
      })
    }
    // declaro la funcion onSubmit,

    async function onSubmit(eve) {
      eve.preventDefault()

      // recojo en formprofile todos los datos que se encuentran en el formulario, incluida el file. paso a FormData cada valor del formulario actualizado, este new se encara de asignar cada nombre con su correcto valor actualizado.

      //El objetivo es enviarlo a traves de fetch como  body en peticion multipart
      const FormProfile = eve.currentTarget
      const formInfo = new FormData(FormProfile)

      try {
        // FormProfile.dataset es un objeto que recoge todos los atributos html de mi form que empieze por data, el id: data-userId, se genera en formProfile propiedad .dataset que contiene el idUser

        await fetch(
          import.meta.env.VITE_API_URL +
            `/users/${FormProfile.dataset.userId}/updateMe`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: formInfo
          }
        )

        Swal.fire({
          title: 'Updated Profile Data',
          icon: 'success',
          timer: 2000,
          showConfirmedButton: false
        })
        FormProfile.reset()
        loadUser()
      } catch (error) {
        console.error('error on fetch updateme:', error)
        await Swal.fire({
          title: 'Error while updating profile',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Got it!'
        })
      }
    }
  }

  loadUser()
}
