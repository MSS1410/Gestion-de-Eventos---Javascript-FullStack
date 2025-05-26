import { navigate } from '../../../app.js'
import './HeaderApp.css'

export function logOut() {
  localStorage.removeItem('token')
  navigate('/login')
}

window.logOut = logOut

export default function HeaderApp(user) {
  return `
    <header class="header-app">
      <div class="name-logo">
        <h1 class="name">eTOMIC GDE</h1>
        <img class="logo" src="/icons/logo.jpg" alt="Logo eTOMIC GDE"/>
      </div>
      <nav class="nav-app">

        <a
          href="/dashboard"
          onclick="event.preventDefault(); navigate('/dashboard')"
          aria-label="Main Home"
        >
          <img src="/icons/home.png" alt="Home" class="nav-icon"/>
        </a>
        <a
          href="/profile"
          onclick="event.preventDefault(); navigate('/profile')"
          aria-label="My Profile"
        >
          <img src="/icons/profile.png" alt="Profile" class="nav-icon"/>
        </a>

        <a
          href="/myEvents"
          onclick="event.preventDefault(); navigate('/my-Events')"
          aria-label="My Events"
          class="me-icon"
        >
          <img src="/icons/myEvents2.jpg" alt="My Events" class="nav-icon"/>
        </a>

        ${
          user.role === 'admin'
            ? `<a
                 href="/create-event"
                 onclick="event.preventDefault(); navigate('/create-event')"
                 aria-label="Create Event"
               >
                 <img src="/icons/cloudy.png" alt="Create Event" class="nav-icon"/>
               </a>
               
               <a
                href="/community"
               onclick="event.preventDefault(); navigate('/community')"
               aria-label="Community"
               class="cloudy-icon"
               >
               <img src="/icons/com.jpg" alt="Community" class="nav-icon"/>
               </a>
               `
            : ''
        }

        <a
          href="/login"
          onclick="event.preventDefault(); logOut()"
          aria-label="Log Out"
          class="logout-link"
        >
          <img src="/icons/logOut.png" alt="Log Out" class="nav-icon"/>
        </a>

      </nav>
    </header>
  `
}

// Logout debe exportarse para ser llamado desde el onclick del <a>
