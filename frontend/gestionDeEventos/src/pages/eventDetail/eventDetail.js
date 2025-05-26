import './eventDetail.css'
import Swal from 'sweetalert2'
import HeaderApp from '../../components/header/headerApp/HeaderApp'
import FooterAuth from '../../components/footer/footerAuth/footerAuth'
import { request } from '../../services/api.js'
import getUserFromToken from '../../app.js'
import { navigate } from '../../app.js'

export default function EventDetail({ id }) {
  const user = getUserFromToken()

  document.getElementById('header-root').innerHTML = HeaderApp(user)
  document.getElementById('footer-root').innerHTML = FooterAuth()
  const mainRoot = (document.getElementById('main-root').className =
    'eventDetail')

  const html = `
     <section  class="event-info">
       <h2 id="title">Loading...</h2>

        <p id="date"></p>
        
          <p id="location"></p>
          <p  id="description"></p>
          <img id="eventImage" class="event-image" src="" alt="" style="display:none;"/>
    <button id="attendBtn">Confirmar Asistencia</button>

      ${
        user.role === 'admin'
          ? `<div class="admin-controls">

         <button id="editBtn" class="editEv">Edit event</button>
         <button id="deleteBtn" class="deleteEv">Delete Event</button>
     </div>`
          : ''
      }
      </section>
      ${
        user?.role === 'admin'
          ? `<section class="event-edit" 
          id="editSection" 
          style="display:none"></section>`
          : ''
      }
    `

  setTimeout(async () => {
    try {
      const event = await request(`/events/${id}`)

      document.getElementById('title').innerText = event.title
      document.getElementById('date').innerHTML = new Date(
        event.date
      ).toLocaleString()

      document.getElementById('location').innerText = event.location
      document.getElementById('description').innerHTML = event.description

      //img evento
      const imgEv = document.getElementById('eventImage')
      if (event.eventImgUrl) {
        imgEv.src = event.eventImgUrl
        imgEv.alt = event.title
        imgEv.style.display = 'block'
      }
      //asist button
      document
        .getElementById('attendBtn')
        .addEventListener('click', async () => {
          try {
            await request(`/events/${id}/attend`, { method: 'POST' })

            await Swal.fire({
              title: ' Confirmed attendance !',
              icon: 'success',
              time: '2000',
              showConfirmButton: false
            })
            navigate('/dashboard')
          } catch (er) {
            await Swal.fire({
              title: ' Error confirming attendance',
              icon: 'error',
              text: er.message,
              time: '2000',
              showConfirmButton: 'Got it!'
            })
          }
        })

      // controler para admin

      if (user?.role === 'admin') {
        //eliminar
        document
          .getElementById('deleteBtn')
          .addEventListener('click', async () => {
            const { isConfirmed } = await Swal.fire({
              title:
                'You are goint to permanently delete this event, are you sure?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes, proceed',
              cancelButtonText: 'No, Cancel'
            })

            if (isConfirmed) {
              await request(`/events/${id}/delete`, { method: 'DELETE' })
              await Swal.fire('Deleted Event', '', 'succes')
              navigate('/dashboard')
            }
          })

        //edit

        document.getElementById('editBtn').addEventListener('click', () => {
          const editSection = document.getElementById('editSection')

          if (editSection.innerHTML) {
            editSection.style.display =
              editSection.style.display === 'none' ? 'block' : 'none'
            return
          }

          editSection.innerHTML = `
            <h3>Edit Event</h3>
            <form id="updateEventForm" enctype = "multipart/from-data" class="form-edit">

            <label>
            Title:
            <input name= "title" value="${event.title}" required />
            </label>


            <label>
            Date:
            <input name= "date" value="${event.date}" required />
            </label>


            <label>
            Location:
            <input name= "location" value="${event.location}" required />
            </label>

            <label>
            Description:
            <input name= "description" value="${event.description}" required />
            </label>

            <label >
            New Media:
            <input class="fondo" type= "file" name="eventImgUrl" accept ="image/*" />
            </label>

            <label>
            
            <button type= "submit" class="saveBtn" >Save modifications</button>
            </label>
        </form>

            `
          editSection.style.display = 'block'

          // listeners del edicion

          document
            .getElementById('updateEventForm')
            .addEventListener('submit', async (eve) => {
              eve.preventDefault()
              const formInfo = new FormData(eve.target)

              try {
                await request(`/events/${id}/update`, {
                  method: 'PUT',
                  body: formInfo
                })
                await Swal.fire({
                  title: 'Updated Event ',
                  icon: 'success',
                  timer: 1500,
                  showConfirmButton: false
                })
                navigate(`/events/${id}`)
              } catch (error) {
                await Swal.fire('Error', err.message, 'error')
              }
            })
        })
      }
    } catch (error) {
      document.querySelector('.main-root').innerHTML =
        '<p> Error while loading event</p>'
    }
  }, 0)

  return html
}
