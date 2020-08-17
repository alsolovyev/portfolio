const path = require('path')


/** Get current working directory */
const cwd = process.cwd()


module.exports = {
  dist: path.resolve(cwd, 'dist'),
  eslintConfig: path.resolve(__dirname, '.eslintrc.js'),
  js: path.resolve(cwd, 'src', 'js'),
  njk: {
    data: require(path.resolve(cwd, 'src', 'data', 'data.js')),
    globals: {
      icon: path.join(__dirname, 'nunjucks', 'globals', 'icon.js')
    }
  },
  sass: path.resolve(cwd, 'src', 'sass'),
  tsConfig: path.resolve(__dirname, '.tsconfig.json'),
  stylelintConfig: path.resolve(__dirname, '.stylelintrc'),
  src: path.resolve(cwd, 'src')
}
