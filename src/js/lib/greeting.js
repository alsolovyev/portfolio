/**
 * Say hello
 *
 * @param {string} name - Author name
 * @param {string} email - Author email
 */
const greeting = ({ name = 'janeRivas' , email = 'solovyev.a@icloud.com' }) => {
  if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
    window.console.log.apply(console, [
      `\n\n%c Made with ❤️ by ${ name } %c <${ email }> %c %c 🐳 \n\n`,
      'border: 1px solid #181C21; background: #F6F6F4; color: #181C21; padding: 5px 0',
      'border: 1px solid #181C21; background: #181C21; color: #F6F6F4; padding: 5px 0',
      'padding: 5px 0',
      'padding: 5px 0',
    ])
  } else if (window.console) {
    window.console.log(`Made with love ❤️ ${ name } - <${ email }> 🐳`)
  }
}


export default greeting
