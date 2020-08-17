const { src } = require('./paths')
const { eslintLoader, fontLoader, imgLoader, jsLoader, nunjucksLoader, sassLoader, tsLoader, svgLoader } = require('./loaders')
const { copyPluginConf, friendlyErrorsPluginConf, htmlPluginConf, stylelintPluginConf } = require('./plugins')
const { watchFileChanges } = require('./utils')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')


module.exports = {
  name: 'dev',
  mode: 'development',
  context: src,
  entry: {
    app: ['./js/app.js', './sass/app.sass']
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.sass', '.png', '.jpg'],
    alias: {
      '@': src
    }
  },
  devtool: 'eval-source-map',
  stats: { all: false, colors: true, timings: true },
  devServer: {
    port: process.env.PORT || 8080,
    host: '0.0.0.0',
    hot: true,
    quiet: true,
    inline: true,
    compress: true,
    historyApiFallback: true,
    before: watchFileChanges,
    watchOptions: {
      ignored: ['node_modules/**']
    }
  },
  plugins: [
    new HTMLWebpackPlugin(htmlPluginConf),
    new StylelintPlugin(stylelintPluginConf),
    new FriendlyErrorsPlugin(friendlyErrorsPluginConf),
    new CopyPlugin(copyPluginConf)
  ],
  module: {
    rules: [
      eslintLoader,
      fontLoader,
      imgLoader,
      jsLoader,
      sassLoader,
      tsLoader,
      svgLoader,
      nunjucksLoader
    ]
  }
}
