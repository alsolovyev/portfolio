const { dist, src } = require('./paths')
const { eslintLoader, fontLoader, imgLoader, jsLoader, nunjucksLoader, sassLoader, tsLoader, svgLoader } = require('./loaders')
const { copyPluginConf, friendlyErrorsPluginConf, MiniCssExtractConf, OptimizeCSSAssetsConf, TerserConf, htmlPluginConf } = require('./plugins')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')


module.exports = {
  name: 'prod',
  mode: 'production',
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
  output: {
    // library: 'app',
    // libraryTarget: 'umd',
    path: dist,
    filename: 'js/[name].[hash:8].js',
    publicPath: '/portfolio/'
  },
  devtool: 'source-map',
  stats: { all: false, colors: true, assets: true },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimize: true,
    minimizer: [
      new OptimizeCSSAssetsPlugin(OptimizeCSSAssetsConf),
      new TerserPlugin(TerserConf)
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin(htmlPluginConf),
    new MiniCssExtractPlugin(MiniCssExtractConf),
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
