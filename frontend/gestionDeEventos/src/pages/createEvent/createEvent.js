import './createEvent.css'
import Swal from 'sweetalert2'
import HeaderApp from '../../components/header/headerApp/HeaderApp.js'
import FooterAuth from '../../components/footer/footerAuth/footerAuth.js'
import { navigate } from '../../app.js'
import { request } from '../../services/api.js'

import getUserFromToken from '../../app.js'

export default function createEvent() {
  const user = getUserFromToken()
  document.getElementById('header-root').innerHTML = HeaderApp(user)
  document.getElementById('footer-root').innerHTML = FooterAuth()
  document.getElementById('main-root').className = ''

  const html = `
        <section class="create-event">
            <h2>Create Event</h2>
              <form id="createEventForm" enctype="multipart/form-data">

             <label>Title:
             <input name="title" 
             required />
             </label>

              <label>Date:
                <input type="date" 
                  name="date" required />
                </label>

                <label>Location:
                <input name="location" 
                required />
                  </label>

           <label>Description:
               <textarea name="description"></textarea>
             </label>

         <label class="eventMedia">
          Event Media:
            <input type="file" 
             name="eventImgUrl" accept="image/*" />
         </label>

         <button type="submit">Create</button>
          </form>
        </section>
      `

  setTimeout(() => {
    const form = document.getElementById('createEventForm')
    if (!form) return

    form.addEventListener('submit', async (eve) => {
      eve.preventDefault()

      const formInfo = new FormData(eve.target)
      try {
        await request('/events/create', {
          method: 'POST',
          body: formInfo
        })

        await Swal.fire({
          title: 'Event Posted!',
          icon: 'success',
          timer: '2000',
          showConfirmButton: false
        })
        navigate('/create-event')
      } catch (error) {
        await Swal.fire({
          title: 'Error Posting Event',
          text: error.message,
          icon: 'error',
          timer: '2000',
          showConfirmButton: 'Got it!'
        })
      }
    })
  })

  return html
}
