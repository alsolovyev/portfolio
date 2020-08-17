/**
 * Returns a HTML element
 *
 * @param {String} tag - Tag name
 * @param {String} className - Class name
 * @returns {HTMLElement} - HTML element
 */
const createElement = (tag, className) => {
  const element = document.createElement(tag)

  if (className)
    className.split(/\s+/).forEach(name => element.classList.add(name))

  return element
}


export default createElement
