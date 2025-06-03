import './Login.css'
import HeaderAuth from '../../components/header/headerAuth/HeaderAuth.js'
import FooterAuth from '../../components/footer/footerAuth/footerAuth.js'
import { request } from '../../services/api.js'
import { navigate } from '../../app.js'

export default function Login() {
  document.getElementById('main-root').className = ''

  // 1 login register header n footer
  document.getElementById('header-root').innerHTML = HeaderAuth()
  document.getElementById('footer-root').innerHTML = FooterAuth()
  // 1 construyo html lo devuelvo en string
  const html = `
    <div class="auth-container">
      <h2>Log In</h2>
      <form id="loginForm">
        <label>E-mail</label>
        <input name="email" type="email" required />
        <label>Password</label>
        <input name="password" type="password" required />
        <button class="LogIn" type="submit">Log In</button>
      </form>
      <button class="toSign" id="toSign">Sign Up</button>
    </div>
  `

  // 2 "truco o tip " en VITE , pasar cada listener de los elementos que querremos en nuestra view, una vez estos elementos se hayan plasmado en el DOM. al no tener un aweait que me de el retraso que necesito para montar los listeners, lo genero.
  // al final tendria lo mismo si lo generara mediante  export default async function Login, await + resolver promise devolviendo el dom pintado, y marcar el form.addEvent + return html. Son distintos metodos. mismo resultado
  // de alguna manera le digo, pon esta funcion a la cola de funciones encargadas de levantar el login. que sea lo ultimo. "macrotasks".
  setTimeout(() => {
    console.log(
      'Login list montados,formu:',
      document.getElementById('loginForm')
    )
    console.log('token')

    const form = document.getElementById('loginForm')

    form.addEventListener('submit', async (eve) => {
      eve.preventDefault()
      const { email, password } = Object.fromEntries(new FormData(form))

      try {
        const { token } = await request('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password })
        })

        localStorage.setItem('token', token)
        navigate('/dashboard')
      } catch (err) {
        alert(err.message)
      }
    })

    document
      .getElementById('toSign')
      .addEventListener('click', () => navigate('/register'))
  }, 0)

  return html
}
