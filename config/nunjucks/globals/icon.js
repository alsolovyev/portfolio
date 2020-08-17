/**
 * Add SVG icons
 *
 * @example
 * - app.js
 *   import '@/images/iconName.svg'
 * - page.njk
 *   {{ icon('iconName') | safe }}
 */


module.exports = name => {
  return `<svg><use xlink:href="#${name}"></use></svg>`
}
