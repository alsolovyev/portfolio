/** Class representing a simple swipe detection */
class SwipeMe {
  /**
   * @param {HTMLElement} el - The target
   * @param {function} callback - The callback that handles swipe event
   * @param {number} [threshold=100] - The minimum distance traveled to be considered swipe
   */
  constructor(el, callback, threshold = 100) {
    this.el = el
    this.callback = callback
    this.threshold = threshold

    this.startX = 0
    this.startY = 0
    this.endX = 0
    this.endY = 0
    this.offsetX = 0
    this.offsetY = 0

    if (this.isTouchDevice()) {
      this.onTouchMove = this.onTouchMove.bind(this)
      this.onTouchEnd = this.onTouchEnd.bind(this)
      this.el.addEventListener('touchstart', this.onTouchStart.bind(this), false)
    } else {
      this.onMouseMove = this.onMouseMove.bind(this)
      this.onMouseUp = this.onMouseUp.bind(this)
      this.el.addEventListener('mousedown', this.onMouseDown.bind(this), false)
    }
  }

  /**
   * Touch device handlers
   */
  onTouchStart(event) {
    this.startX = event.changedTouches[0].screenX
    this.startY = event.changedTouches[0].screenY
    this.el.addEventListener('touchend', this.onTouchEnd, false)
    this.el.addEventListener('touchmove', this.onTouchMove, false)
  }

  onTouchMove(event) {
    this.offsetX = event.changedTouches[0].screenX - this.startX
    this.offsetY = event.changedTouches[0].screenY - this.startY
  }

  onTouchEnd(event) {
    this.endX = event.changedTouches[0].screenX
    this.endY = event.changedTouches[0].screenY
    this.handleGesture()
    this.el.removeEventListener('touchend', this.onTouchEnd, false)
    this.el.removeEventListener('touchmove', this.onTouchMove, false)
  }

  /**
   * Mouse device handlers
   */
  onMouseDown(event) {
    this.startX = event.screenX
    this.startY = event.screenY
    window.addEventListener('mousemove', this.onMouseMove, false)
    window.addEventListener('mouseup', this.onMouseUp, false)
  }

  onMouseMove(event) {
    this.offsetX = event.screenX - this.startX
    this.offsetY = event.screenY - this.startY
  }

  onMouseUp(event) {
    this.endX = event.screenX
    this.endY = event.screenY
    this.handleGesture()
    window.removeEventListener('mousemove', this.onMouseMove, false)
    window.removeEventListener('mouseup', this.onMouseUp, false)
  }

  /**
   * Returns information about swipe event
   * @typedef {Object}
   * @property {string} direction - The swipe direction. Can be either "top", "right", "bottom" or "left"
   * @property {number} offsetX - The horizontal axis offset
   * @property {number} offsetY - The vertical  axis offset
   */
  handleGesture() {
    let direction

    switch (true) {
      case (this.startX > this.endX && this.offsetX < -this.threshold):
        direction = 'left'
        break;
      case (this.startX < this.endX && this.offsetX > this.threshold):
        direction = 'right'
        break;
      case (this.startY > this.endY && this.offsetY < -this.threshold):
        direction = 'top'
        break;
      case (this.startY < this.endY && this.offsetY > this.threshold):
        direction = 'down'
        break;
      default:
        direction = 'tab'
    }

    this.callback({direction, offsetX: this.offsetX, offsetY: this.offsetY})
  }

  /**
   * Detects touch devices
   * @returns {boolean|number}
   */
  isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints
  }
}


export default SwipeMe
