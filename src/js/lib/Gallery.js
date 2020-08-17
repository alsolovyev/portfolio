/* eslint-disable */
import createElement from '@/js/utils/createElement'
import errorImage from '@/assets/images/error.png'


/**
 * Gallery
 */
class Gallery {
  constructor({ container }) {
    if (Gallery.instance instanceof Gallery) return Gallery.instance
    Gallery.instance = this

    this.gallery = container
    this.modal = this._createModal()

    this._init()
  }


  /**
   * Initialization
   */
  _init() {
    this.modal.image.onload = () => document.body.classList.add('modal-is-loaded')
    this.modal.image.onerror = () => this.modal.image.src = errorImage
    this.modal.el.appendChild(this.modal.image)
    this.modal.isOpen = false

    document.body.appendChild(this.modal.el)

    this._bindMethods()
    this._addListeners()
  }


  /**
   * Returns an object of modal window elements
   *
   * @return {Object} modal - Modal window elements
   * @retusn {HTMLElement} modal.node - The root element
   * @retusn {HTMLElement} modal.image - The image element
   */
  _createModal() {
    const modal = Object.create(null)
    modal.el = createElement('section', 'modal spinner')
    modal.image = createElement('img', 'modal__img')

    return modal
  }


  /**
   * Open image modal window
   *
   * @param {string} url - The URL for full size image
   */
  openModal(src) {
    if (this.modal.isOpen) return

    this.modal.isOpen = true
    document.body.classList.add('modal-is-open')

    if (this.modal.image.src.indexOf(src) === -1) {
      this.modal.image.src = src
    } else {
      document.body.classList.add('modal-is-loaded')
    }

    this.modal.el.addEventListener('touchend', this.closeModal)
    this.modal.el.addEventListener('wheel', this._onScroll)
  }


  /**
   * Close image modal window
   */
  closeModal() {
    if (!this.modal.isOpen) return

    this.modal.isOpen = false
    document.body.classList.remove('modal-is-open')
    document.body.classList.remove('modal-is-loaded')

    this.modal.el.removeEventListener('touchend', this.closeModal)
    window.removeEventListener('wheel', this._onScroll)
  }


  /**
   * Handle click event
   */
  _onClick(event) {
    const src = event.target.getAttribute('data-original')
    if (src === null) return

    this.modal.isOpen ? this.closeModal() : this.openModal(src)
  }


  /**
   * Handle scroll event
   */
  _onScroll() {
    this.closeModal()
  }

  /**
   * Bind methods
   */
  _bindMethods() {
    this._onClick = this._onClick.bind(this)
    this._onScroll = this._onScroll.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }


  /**
   * Add event handlers
   */
  _addListeners() {
    this.gallery.addEventListener('click', this._onClick)
    this.modal.el.addEventListener('click', this.closeModal)
  }
}


export default Gallery
