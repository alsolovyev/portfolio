/**
 * Custom cursor
 */
class Cursor {
  /**
   * @param {string} [selector='cursor'] - Custom CSS selector
   * @param {string|number} [size=10] - The width and height of the cursor
   * @param {string} [color='currentColor'] - The background color of the cursor
   * @param {string|number} [coef=0.1] - The normal value (between 0 and 1) to control the Linear Interpolation
   */
  constructor({ selector = 'cursor', size = 10, color = 'currentColor', coef = 0.1 } = {}) {
    if (Cursor.instance instanceof Cursor) return Cursor.instance
    Cursor.instance = this


    if (this.isTouchDevice()) return {}


    this.element = document.createElement('div')
    this.styleElement = document.createElement('style')
    this.selector = selector
    this.size = size
    this.color = color
    this.coef = +coef
    this.rafID = null
    this.isRunning = true
    this.pos = {
      mx: 0,
      my: 0,
      ex: 0,
      ey: 0
    }


    this.addElement()
    this.addStyleSheet()
    this.bindMethods()
    this.addListeners()
    this.follow()
  }


  /** Add cursor to the DOM */
  addElement() {
    this.element.classList.add(this.selector)
    document.body.insertAdjacentElement('beforeEnd', this.element)
  }


  /** Add stylesheet element to the DOM */
  addStyleSheet(duration = 150) {
    document.head.appendChild(this.styleElement)
    this.styleElement.sheet.insertRule(`.${this.selector} {
      position: fixed;
      z-index: 999;
      width: ${this.size}px;
      height: ${this.size}px;
      margin-left: -${this.size / 2}px;
      margin-top: -${this.size / 2}px;
      border-radius: 50%;
      background: ${this.color};
      pointer-events: none;
      user-select: none;
      transition: transform ${duration}ms, opacity ${duration}ms;
      transition: transform ${duration}ms, opacity ${duration}ms, -webkit-transform ${duration}ms;
      transition: opacity ${duration}ms, -webkit-transform ${duration}ms;
      -webkit-transition: opacity ${duration}ms, -webkit-transform ${duration}ms;
           -o-transition: transform ${duration}ms, opacity ${duration}ms
    }`)

    this.styleElement.sheet.insertRule(`.${this.selector}--is-pressed {
      -webkit-transform: scale3d(3, 3, 3);
              transform: scale3d(3, 3, 3);
      opacity: .1
    }`)
  }


  /** Get mouse position */
  getMousePos({clientX: x, clientY: y}) {
    this.pos.mx = x
    this.pos.my = y
  }


  /** Calculate and set cursor position */
  follow() {
    this.pos.ex = this.lerp(this.pos.ex, this.pos.mx, this.coef)
    this.pos.ey = this.lerp(this.pos.ey, this.pos.my, this.coef)

    this.element.style.left = `${this.pos.ex}px`
    this.element.style.top = `${this.pos.ey}px`

    this.raf = requestAnimationFrame(this.follow)
  }


  /** Clean up */
  destroy() {
    if (!this.isRunning) return

    this.element.parentNode.removeChild(this.element)
    this.styleElement.parentNode.removeChild(this.styleElement)
    document.removeEventListener('mouseup', this.onMouseRelease)
    document.removeEventListener('mousemove', this.getMousePos)
    document.removeEventListener('mousedown', this.onMousePress)
    window.console.log('Cursor has been successfully destroyed')

    this.isRunning = false
  }


  /** Handle mouse move event */
  onMouseMove(event) {
    this.getMousePos(event)
    if (event.target.tagName === 'BUTTON' || event.target.tagName === 'A') {
      this.element.classList.add(`${this.selector}--is-pressed`)
    } else {
      this.element.classList.remove(`${this.selector}--is-pressed`)
    }
  }


  /** Add '--is-pressed' class to the cursor  */
  onMousePress() {
    this.element.classList.add(`${this.selector}--is-pressed`)
  }


  /** Remove '--is-pressed' class from the cursor  */
  onMouseRelease() {
    this.element.classList.remove(`${this.selector}--is-pressed`)
  }


  /** Add event listeners */
  addListeners() {
    document.addEventListener('mouseup', this.onMouseRelease)
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mousedown', this.onMousePress)
  }


  /** Bind methods */
  bindMethods() {
    this.follow = this.follow.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMousePress = this.onMousePress.bind(this)
    this.onMouseRelease = this.onMouseRelease.bind(this)
  }


  /**
   * Linear interpolation
   * @param {number} v0 - The starting value
   * @param {number} v1 - The destination value
   * @param {number} t - The normal value (between 0 and 1) to control the Linear Interpolation
   * @return {number} - A value between two numbers at a specified, decimal midpoint
   */
  lerp(v0, v1, t) {
    return (1 - t) * v0 + t * v1
  }


  /**
   * Detect touch screen devices
   * @return {boolean}
   */
  isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints
  }


  /**
   * @type {HTMLElement}
   */
  get el() {
    return this.element
  }
}


export default Cursor
