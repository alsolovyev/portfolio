const works = require('./works')
const articles = require('./articles')
const profiles = require('./profiles')

module.exports = {
  title: 'Jane Rivas | Photographer',
  description: '',
  author: 'janeRivas <solovyev.a@icloud.com> (https://github.com/alsolovyev)',
  theme: '#82AAFF',
  logo: {
    bold: 'Jane',
    light: 'Rivas'
  },
  about: 'I am a developer & designer currently focused on building creativity apps. I would be glad to become a part of your next project. Please feel free to <a class="s-link" href="#contacts">contact me</a>.',
  copyright: 'Made with <span class="red">&#9829;</span> by janeRivas',
  works,
  articles,
  profiles
}
