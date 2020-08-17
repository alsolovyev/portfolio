const { eslintConfig, js, njk, sass, tsConfig, src } = require('./paths')
const { getThreadLoader, isDevMode } = require('./utils')
const { loader: MiniCssExtractLoader } = require('mini-css-extract-plugin')


/** Config for JS loader */
const jsLoader = {
  test: /\.js$/i,
  exclude: /node_modules/,
  include: js,
  use: [
    'cache-loader',
    getThreadLoader('javaScript'),
    {
      loader: 'babel-loader',
      options: {
        presets: [['@babel/preset-env', { 'modules': false, 'loose': true }]],
        plugins: []
      }
    }
  ]
}


/** Config for ESlint loader */
const eslintLoader = {
  enforce: 'pre',
  test: /\.js$/i,
  exclude: /node_modules/,
  include: js,
  use: [
    'cache-loader',
    getThreadLoader('eslint'),
    {
      loader: 'eslint-loader',
      options: {
        cache: isDevMode,
        configFile: eslintConfig
      }
    }
  ]
}


/** Config for Nunjcuks loader */
const nunjucksLoader = {
  test: /\.(njk|nunjucks|html)$/i,
  include: src,
  use: [
    'cache-loader',
    getThreadLoader('nunjucks'),
    {
      loader: 'simple-nunjucks-loader',
      options: {
        searchPaths: ['src'],
        assetsPaths: ['src/assets'],
        globals: {
          icon: njk.globals.icon
        }
      }
    }
  ]
}


/**
 * Config for Sass loader
 */
const sassLoader = {
  test: /\.s[ac]ss$/i,
  include: sass,
  use: [
    isDevMode && 'cache-loader',
    isDevMode ? 'style-loader' : MiniCssExtractLoader,
    { loader: 'css-loader', options: { sourceMap: true } },
    !isDevMode && { loader: 'postcss-loader', options: { sourceMap: true, plugins: [ require('autoprefixer') ] }},
    { loader: 'sass-loader', options: { sourceMap: true } }
  ].filter(Boolean)
}


/**
 * Config for TypeScript
 */
const tsLoader = {
  test: /\.ts(x?)$/,
  exclude: /node_modules/,
  include: js,
  use: [
    'cache-loader',
    {
      loader: 'babel-loader',
      options: {
        presets: [['@babel/preset-env', { 'modules': false, 'loose': true }]],
        plugins: []
      }
    },
    {
      loader: 'ts-loader',
      options: {
        context: src,
        configFile: tsConfig
      }
    }
  ]
}


/**
 * Config for Image loader
 */
const imgLoader = {
  test: /\.(png|jpe?g|gif)$/i,
  use: [{ loader: 'file-loader', options: isDevMode ? { } : { name: '[path][name].[hash:8].[ext]' } }]
}


/**
 * Config for Font loader
 */
const fontLoader = {
  test: /\.(woff|woff2|ttf|otf)$/i,
  use: [{ loader: 'file-loader', options: isDevMode ? { } : { name: '[path][name].[hash:8].[ext]' } }]
}


/** SVG Loader */
const svgLoader = {
  test: /\.svg$/,
  use: ['svg-sprite-loader', 'svg-transform-loader', 'svgo-loader']
}


module.exports = { eslintLoader, fontLoader, imgLoader, jsLoader, nunjucksLoader, sassLoader, tsLoader, svgLoader }
