/**
 * Page load handler
 *
 * @param {function} onComplete - A function triggered on page load
 */
const onPageLoad = ({ onComplete = () => {} } = {}) => {
  const _preloader = document.querySelector('[data-preloader]')
  const _images = document.querySelectorAll('[data-thumbnail]')
  let _imagesLength = _images.length - 1

  /** Hide preloader after all images will be loaded */
  const _hidePreloader = () => {
    _imagesLength === 0 ? document.body.classList.remove('page-is-loading') : _imagesLength--
  }

  _images.forEach(image => {
    // Handle load event
    image.onload = image.onerror = _hidePreloader

    // Lazy load
    image.setAttribute('srcset', image.getAttribute('data-srcset'))
    image.src = image.getAttribute('data-src')
  })

  /** Remove preloader on animation ends */
  _preloader.addEventListener('animationend', event => {
    event.pseudoElement === '::before' && document.body.removeChild(event.target) && onComplete()
  })
}


export default onPageLoad
