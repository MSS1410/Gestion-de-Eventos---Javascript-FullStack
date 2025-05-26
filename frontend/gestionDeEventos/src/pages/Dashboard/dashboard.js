import './dashboard.css'
import { request } from '../../services/api.js'

import getUserFromToken from '../../app.js'
import { navigate } from '../../app.js'
import HeaderApp from '../../components/header/headerApp/HeaderApp.js'
import FooterApp from '../../components/footer/footerApp/footerApp.js'

import initSwiper from '../../components/swiper/SwiperComp.js'
import 'swiper/css'

export default function Dashboard() {
  const mainRoot = document.getElementById('main-root')
  mainRoot.className = 'dashboard'
  //lee usuario
  const user = getUserFromToken()
  if (!user) {
    return '<p>Innaccesible site</p>'
  }
  document.getElementById('header-root').innerHTML = HeaderApp(user)
  document.getElementById('footer-root').innerHTML = FooterApp()

  const html = `
      <section class="events-list">
        <h2>Eventos Disponibles</h2> 
          <ul id="events-list"></ul>
       </section>

       <aside class="users-list">
           <h2>eTOMIC Community</h2>
           <ul id="users-list"></ul>
        </aside>

        <section class="events-swiper">
          <div id="swiper-container" class="swiper">
          <div class="swiper-wrapper"></div>
          </div>
        </section>
          
          `

  ;(async () => {
    try {
      // carga de eventos
      const events = await request('/events/get')

      const listHTML = events

        .map((eve) => {
          const fecha = new Date(eve.date).toLocaleDateString()
          return `
          <li>
          <a href="/events/${eve._id}"
          onclick="event.preventDefault(); navigate("/events/${eve._id}")"

              <span class="event-date">${fecha}</span>
            <span class="event-title">${eve.title} -</span>
              <span class="event-location">${eve.location}</span>
          
          </a>
          </li>
          `
        })
        .join('')
           // debo pasar el listado de eventos y pintar el elemento generado, separo el momento plasmar el listado de los usuarios. separado
      document.getElementById('events-list').innerHTML = listHTML

      //USERS ASIDE
      const users = await request('/users')
      const usersHTML = users
        .map(
          (user) =>
            `<li>
          <img src="${user.avatarLink}" class="avatar-img" /> 
          <span class=""user-name">${user.name}</span>
          </li>`
        )
        .join('')
      document.getElementById('users-list').innerHTML = usersHTML

      const swiperContainer = document.getElementById('swiper-container')
      initSwiper(swiperContainer, events)
    } catch (error) {
      console.error('error while loading Dashboard:', error)

      document.getElementById('events-list').innerHTML =
        '<li>Error cargando eventos</li>'

      document.getElementById('users-list').innerHTML =
        '<li>Error cargando usuarios</li>'
    }
  })()
 // devuelvo el total 
  return html
}
