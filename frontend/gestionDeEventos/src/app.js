import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Dashboard from './pages/Dashboard/dashboard'
import Profile from './pages/MyProfile/MyProfile'

import Community from './pages/Community/Community'
import eventDetail from './pages/eventDetail/eventDetail'
import myEvents from './pages/myEvents/myEvents'
import createEvent from './pages/createEvent/createEvent'
import FooterApp from './components/footer/footerApp/footerApp'

const mainRoot = document.getElementById('main-root')

// ajusto las funciones segun lo que esperara el navigate.

export function navigate(to) {
  history.pushState({}, '', to)
  router()
}

window.navigate = navigate

const publicRoutes = {
  '/': Login,
  '/login': Login,
  '/register': Register
}

const privateRoutes = {
  '/dashboard': Dashboard,
  '/profile': Profile,
  '/create-event': createEvent,
  '/my-Events': myEvents,
  '/community': Community
}

//verificar signature del token en cada peticion evita modificaciones del token, signature seria invalido + evito hacer fetch y extraigo informacion del usuario a traves de app.
//
export default function getUserFromToken() {
  try {
    const token = localStorage.getItem('token')
    if (!token) return null
    // 1 Separo el payload, donde estan ids, roles, parte media del jwt
    const base64Payload = token.split('.')[1]
    // 2 decodifico mediante atob que es metodo javascript decodificar de base64
    // en esta parte tengo cifras
    const jsonPayload = atob(base64Payload)
    // 3  con el pase de atob y parsearlo a json transfroma cifras a valor y dato
    return JSON.parse(jsonPayload)
  } catch {
    return null
  }
}

function router() {
  //window entorno de navegaodr
  const path = window.location.pathname
  const user = getUserFromToken()
  // sin ruta mando login
  if (path === '/') {
    mainRoot.innerHTML = Login()
    return
  }
  // evitar bugeos
  if (!user) {
    const View = publicRoutes[path] || Login
    mainRoot.innerHTML = View()
    return
  }

  // detalle de evento,  si coindice /evnets/conalgunId y no tengo subrutas extra
  if (path.startsWith('/events/') && path.split('/').length === 3) {
    // extrae el id
    const id = path.split('/')[2]
    mainRoot.innerHTML = eventDetail({ id })
    return
  }

  // Ruta priv
  const View = privateRoutes[path] || Dashboard
  mainRoot.innerHTML = View()
}

window.addEventListener('popstate', router)

router()
