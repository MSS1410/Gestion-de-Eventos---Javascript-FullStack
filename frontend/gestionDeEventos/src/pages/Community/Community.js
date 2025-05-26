import './Community.css'
import Swal from 'sweetalert2'
import HeaderApp from '../../components/header/headerApp/HeaderApp.js'
import FooterAuth from '../../components/footer/footerAuth/footerAuth.js'
import getUserFromToken, { navigate } from '../../app.js'
import { request } from '../../services/api.js'

export default function Community() {
  const user = getUserFromToken()

  document.getElementById('header-root').innerHTML = HeaderApp(user)
  document.getElementById('footer-root').innerHTML = FooterAuth()

  const mainRoot = document.getElementById('main-root')
  mainRoot.className = 'community'

  // 1 si no hay sesion y no es admin
  if (!user || user.role !== 'admin') {
    navigate('/dashboard')
    return ''
  }
  // 2  pintamos html
  const html = `
    <h2 class="community-title">eTOMIC Community</h2>
    <ul id="community-list" class="community-list">
      <li class="loading">Cargando usuarios…</li>
    </ul>
  `

  // 3 fetch en los usuarios
  setTimeout(async () => {
    const listUser = document.getElementById('community-list')
    if (!listUser) return

    try {
      const users = await request('/users')
      if (!users.length) {
        listUser.innerHTML =
          '<li class="empty">No hay usuarios registrados.</li>'
        return
      }
      // 4 edicion de cada li
      listUser.innerHTML = users
        .map(
          (u) => `
          <li class="community-card" data-id="${u._id}">
            <img
              src="${u.avatarLink || '/icons/placeholder-avatar.png'}"
              alt="${u.name}"
              class="avatar-img"
            />
            <div class="u-info">
              <strong>${u.name}</strong>
              <small>${u.email}</small>
              <small>Eventos: ${u.eventsAttending?.length || 0}</small>
            </div>
            <button class="btn-user-delete" data-id="${u._id}">
              🗑️
            </button>
          </li>`
        )
        .join('')

      // 5 eliminar usuario
      document.querySelectorAll('.btn-user-delete').forEach((btn) => {
        btn.addEventListener('click', async () => {
          const { isConfirmed } = await Swal.fire({
            title: 'Delete this User permanently?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, proceed',
            cancelButtonText: 'No, cancel'
          })
          if (!isConfirmed) return
          try {
            await request(`/users/${user.id}/delete`, { method: 'DELETE' })
            btn.closest('.community-card').remove()
          } catch (err) {
            Swal.fire('Error', err.message, 'error')
          }
        })
      })
    } catch (err) {
      listUser.innerHTML = '<li class="error">Error cargando usuarios.</li>'
    }
  }, 0)

  return html
}
