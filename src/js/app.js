import greeting from './lib/greeting'
import onPageLoad from './lib/onPageLoad'
import Cursor from './lib/Cursor'
import Tabs from './lib/Tabs'
import Gallery from './lib/Gallery'
import toggleScroller from './lib/toggleScroller'
import './lib/anchorScroll'
import './lib/icons'


/** Greetings, Sire! */
greeting({
  name: 'Jane Rivas',
  email: 'solovyev.a@icloud.com'
})


/** Custom cursor */
new Cursor({
  color: '#82AAFF'
})


/** Gallery */
new Gallery({
  container: document.querySelector('[data-gallery]')
})


/** Custom tabs */
new Tabs({
  container: document.querySelector('[data-custom-tabs]')
})


/** Toogle sctoll to top button */
toggleScroller({
  element: document.querySelector('[data-scroller]'),
  className: 'scroller--is-hidden'
})


/** Hide preloader on images load */
onPageLoad({
  onComplete: () => {
    /** Magic */
  }
})

// let imagesLength = 9
// window.hidePreloader = function() {
//   console.log(imagesLength)
//   imagesLength === 0 ? document.body.classList.remove('page-is-loading') : imagesLength--
// }
