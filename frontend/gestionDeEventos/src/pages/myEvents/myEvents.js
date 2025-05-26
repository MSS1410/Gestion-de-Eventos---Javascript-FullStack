import './myEvents.css'

import HeaderApp from '../../components/header/headerApp/HeaderApp'
import FooterAuth from '../../components/footer/footerAuth/footerAuth'
import { request } from '../../services/api'
import getUserFromToken, { navigate } from '../../app'

export default function MyEvents() {
  const mainRoot = document.getElementById('main-root')
  mainRoot.className = 'my-events-page'

  const user = getUserFromToken()
  document.getElementById('header-root').innerHTML = HeaderApp(user)
  document.getElementById('footer-root').innerHTML = FooterAuth()

  const html = `
  <section class="my-events">
    <h2>My Events</h2>
    <div class="events-container">
      <ul id="myEvents-list"></ul>
    </div>
  </section>
`

  //fetch y render
  // IIFE async, parecido a   setTimeout, usando metodo async await lo que me genera el retraso sera el await.   Mi router asume que vada view() devuelve un string y lo inyecta en el innerHtml de inmediato. s
  //i me quedo solo con export function default async Ok, recibo una promesa, puedo convertir la promesa a string y pasarla igual por mi router para terminar en navigate pero deberia configurar en cada ruta un await o un .catch,
  // busco tener inmediatez de carga y separo la sincronia de lo que debe esperar a lo sincrono mediante settimeouts o async.

  ;(async () => {
    try {
      const events = await request('/users/myEvents')

      const listItems = events

        .map((eve) => {
          const date = new Date(eve.date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })

          // Avatares
          const avatars = (eve.attendees || [])
            .map(
              (user) => `
                   <img
                       src="${user.avatarLink}"
                         alt=""
                         class="avatar-img"
                            />`
            )
            .join('')

          return `
            <li class="event-card">
                 <h3 class="event-title">${eve.title}</h3>
                     <p class="event-date">${date}</p>
                       <p class="event-desc">${eve.description}</p>
                   <div class="avatars">${avatars}</div>
            </li>
          `
        })
        .join('')
      document.getElementById('myEvents-list').innerHTML =
        listItems ||
        '<li class="empty">You are not attending any events yet.</li>'
    } catch (err) {
      document.getElementById('myEvents-list').innerHTML =
        '<li class="error">Error loading your events.</li>'
    }
  })()

  return html
}
