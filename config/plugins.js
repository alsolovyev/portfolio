const notifier = require('node-notifier')
const { njk, sass, stylelintConfig } = require('./paths')


/** CopyWebpackPlugin */
const copyPluginConf = {
  patterns: [
    {
      from: 'assets/images/works',
      to: 'assets/images/works'
    }
  ]
}


/** HTMLWebpackPlugin */
const htmlPluginConf = {
  template: 'home.njk',
  filename: 'index.html',
  templateParameters: njk.data
}


/** MiniCssExtractPlugin */
const MiniCssExtractConf = {
  filename: 'css/[name].[hash:8].css',
  chunkFilename: 'css/[id].[hash:8].css'
}


/** OptimizeCSSAssetsPlugin */
const OptimizeCSSAssetsConf = {
  cssProcessorOptions: {
    map: { inline: false, annotation: true }
  }
}


/** TerserPlugin */
const TerserConf = {
  test: /\.js(\?.*)?$/i,
  sourceMap: true,
  parallel: 4,
  cache: true
}


/** stylelint-webpack-plugin */
const stylelintPluginConf = {
  configFile: stylelintConfig,
  context: sass
}


/** Friendly Errors Webpack Plugin */
const friendlyErrorsPluginConf = {
  onErrors: (severity, errors) => {
    if (severity !== 'error') return

    notifier.notify({
      title: 'Webpack Error',
      message: ' '
    })
  }
}


module.exports = { copyPluginConf, friendlyErrorsPluginConf, MiniCssExtractConf, OptimizeCSSAssetsConf, stylelintPluginConf, TerserConf, htmlPluginConf }
