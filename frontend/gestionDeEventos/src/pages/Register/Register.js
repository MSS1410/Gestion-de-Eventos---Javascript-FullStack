import Swal from 'sweetalert2'
import './Register.css'
import HeaderAuth from '../../components/header/headerAuth/HeaderAuth.js'
import FooterAuth from '../../components/footer/footerAuth/footerAuth.js'
import { request } from '../../services/api.js'
import { navigate } from '../../app.js'

export default function Register() {
  document.getElementById('main-root').className = ''

  document.getElementById('header-root').innerHTML = HeaderAuth()
  document.getElementById('footer-root').innerHTML = FooterAuth()

  const html = `
    <div class="auth-container">
      <h2>Sign Up</h2>

      <form id="registerForm">
        <label>Name</label>
        <input name="name" type="text" required />

        <label>Email</label>
        <input name="email" type="email" required />

        <label>Password</label>
        <input name="password" type="password" minlength="6" required />
        
        <button  class="signUp"type="submit">Sign Up</button>
      </form>
      <button class="toLogin" id="toLogin">Log In</button>
    </div>
  `

  setTimeout(() => {
    const form = document.getElementById('registerForm')
    form.addEventListener('submit', async (e) => {
      e.preventDefault()
      const data = Object.fromEntries(new FormData(form))
      try {
        await request('/auth/register', {
          method: 'POST',
          body: JSON.stringify(data)
        })

        await Swal.fire({
          title: ' Account Created !',
          icon: 'success',
          timer: '2000',
          showConfirmButton: false
        })
        navigate('/login')
      } catch (err) {
        alert(err.message)
      }
    })

    document
      .getElementById('toLogin')
      .addEventListener('click', () => navigate('/login'))
  }, 0)

  return html
}
