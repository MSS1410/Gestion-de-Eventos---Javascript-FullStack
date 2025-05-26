import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'
import './SwiperComp.css'

export default function inistSwiper(containerSwip, slides) {
  containerSwip.innerHTML = `
    <div class="swiper">

      <div class="swiper-wrapper">
        ${slides
          .map(
            (slide) => `
          <div class="swiper-slide">

            <img src="${slide.eventImgUrl}"  alt="${slide.title}" />
          </div>`
          )
          .join('')}
      </div>
   
    </div>
  `

  new Swiper(containerSwip.querySelector('.swiper'), {
    direction: 'horizontal',
    loop: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    slidesPerView: 3,
    spaceBetween: 20
  })
}
