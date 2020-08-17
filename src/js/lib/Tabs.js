import createElement from '@/js/utils/createElement'
import debounce from '@/js/utils/debounce'

/**
 * Custom tabs
 */
class Tabs {
  constructor({ container, className = 'tabs', current = 0 }) {
    if (Tabs.instance instanceof Tabs) return Tabs.instance
    Tabs.instance = this

    this.className = className
    this.current = current

    this.originalNode = container
    this.data = this._parseData()
    this.newNode = this._createNode()

    this.replaceNode()
    this.addListeners()
  }


  /**
   * Returns information about tabs
   *
   * @returns {Object[]} data - Array of tabs
   *          {String} data.id - Unique identifier
   *          {String} data.title - Tab name
   *          {String} data.text - Tab text
   */
  _parseData() {
    const data = []

    this.originalNode.querySelectorAll('dt').forEach((dt, index) => {
      const tab = Object.create(null)
      tab.id = index
      tab.title = dt.textContent.trim()
      tab.article = dt.nextElementSibling.innerHTML

      data.push(tab)
    })

    return data
  }


  /**
   * Returns a HTML element
   *
   * @param {String} tag - Tag name
   * @param {String} className - Class name
   * @returns {HTMLElement} - HTML element
   */
  // _createElement(tag, className) {
  //   const element = document.createElement(tag)

  //   if (className)
  //     className.split(/\s+/).forEach(name => element.classList.add(name))

  //   return element
  // }


  /**
   *  Create custom tabs
   */
  _createNode() {
    const container = createElement('section', this.className)
    this.line = createElement('span', `${this.className}__line`)
    const nav = createElement('nav', `${this.className}__nav`)
    nav.addEventListener('click', this._onClick.bind(this))
    const navList = createElement('ul', `list`)
    this.content = createElement('div', `${this.className}__content`)

    this.data.forEach(tab => {
      const navItem = createElement('li', `list__item ${this.className}__btn`)
      // const link = createElement('a', `${this.className}__link`)
      const link = createElement('a')
      link.setAttribute('href', `#${tab.title.toLowerCase()}`)
      link.setAttribute('data-id', tab.id)
      link.textContent = tab.title
      navItem.appendChild(link)
      navList.appendChild(navItem)

      const article = createElement('article', `${this.className}__article`)
      article.setAttribute('data-id', tab.id)
      article.innerHTML = tab.article
      this.content.appendChild(article)

      tab.articleNode = article
      tab.titleNode = link
    })

    nav.appendChild(navList)
    nav.appendChild(this.line)
    container.appendChild(nav)
    container.appendChild(this.content)

    return container
  }


  /**
   * Replace the original item with a new one
   */
  replaceNode() {
    this.originalNode.parentNode.replaceChild(this.newNode, this.originalNode)
    setTimeout(() => {
      this.change(this.current)
    }, 0)
  }


  /**
   * Handle a click event in a menu
   */
  _onClick(event) {
    event.preventDefault()
    if (event.target.tagName !== 'A') return

    this.change(event.target.getAttribute('data-id'))
  }


  /**
   * Change active tab
   *
   * @param {number} index - Tab number
   */
  change(index) {
    if (!this.data[index]) throw new Error(`Unexpected tab id: ${index}`)

    this.data[this.current].articleNode.classList.remove(`${this.className}__article--is-shown`)
    this.current = index
    this._resize()
    this.data[index].articleNode.classList.add(`${this.className}__article--is-shown`)
  }


  /**
   * Move decorative line
   */
  _moveDecorLine() {
    const { titleNode } = this.data[this.current]

    this.line.style.left = `${titleNode.offsetLeft + 10}px`
    this.line.style.transform = `scaleX(${titleNode.offsetWidth - 20})`
  }


  /**
   * Set tab content height
   */
  _setContentHeight() {
    this.content.style.height = `${this.data[this.current].articleNode.offsetHeight}px`
  }


  /**
   * Handle resize event
   */
  _resize() {
    this._moveDecorLine()
    this._setContentHeight()
  }


  /**
   * Add event handlers
   */
  addListeners() {
    window.addEventListener('resize', debounce(this._resize.bind(this), 250, false))
  }
}


export default Tabs
