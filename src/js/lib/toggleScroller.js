import debounce from '@/js/utils/debounce'

/**
 * Hide scroll button on page scroll
 *
 * @param {HTMLElement} element - The scroll button
 * @param {string} className - Class name apply to the scroll button
 * @param {number} offset - Trigger distance
 * @param {number} delay - Delay for scroll event
 */
const toggleScroller = ({ element, className, offset = 300, delay = 100 }) => {
  window.addEventListener('scroll', debounce(() => {
    window.scrollY > offset ? element.classList.remove(className) : element.classList.add(className)
  }, delay, false))
}


export default toggleScroller
