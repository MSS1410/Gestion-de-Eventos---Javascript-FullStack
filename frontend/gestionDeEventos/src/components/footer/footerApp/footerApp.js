import './footerApp.css'

export default function FooterApp() {
  return `
    <footer class="footer-app">
      <div class="footer-container">

        <div class="footer-columns">

          <div class="footer-col footer-about">
            <h3>About Us</h3>
            <p class="bout">Our mision remains on exposing non-popular festivals</p> 
            <p class="bout">Our vision is based on an open mind music mentality</p>
            
          </div>
          <div class="footer-col footer-contact">
            <h3>Contact</h3>
            <p class="cont">
              Email:<br> <a>eTOMICeventmanagment@etomic.etm</a><br>
              Phone:<br> <a>+34 634 567 890</a>
            </p>
          </div>
          <div class="footer-col footer-social">
            <h3>Social Network</h3>
            <p class="social-links">
              <a href="#" ><strong>Instagram:</strong> @eTOMIC_GDE_Spain</a><br>
              <a href="#" ><strong>Facebook:</strong> eTOMIC_SPteam</a><br>
              <a href="#" ><strong>X:</strong> @eTOMIC_team</a>
            </p>
          </div>
        </div>
     
      </div>
    </footer>
  `
}
