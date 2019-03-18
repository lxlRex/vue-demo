const fs = require('fs');
const path = require('path')
const config = require('../config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const utils = require('./utils')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

exports.getDevConfig = function () {
  let plugin = []
  let entry = {}
  let rewrites = []
  let runningPrompt = []
  utils.getModules().forEach(item => {
    entry[item] = [
      path.resolve(__dirname, `../src/modules/${item}/main.js`),
      path.resolve(__dirname, `../node_modules/webpack/hot/dev-server.js`),
      path.resolve(__dirname, `../node_modules/webpack-dev-server/client/index.js?/`)
    ];

    plugin.push(new HtmlWebpackPlugin({
      filename: path.join(config.build.assetsRoot, `${item}/index.html`),
      template: path.resolve(__dirname, `../src/modules/${item}/index.html`),
      inject: true,
      chunks: [`${item}`],
      process: {
        env: require('../config/dev.env'),
      },
      minify: {
        removeComments: false,
        collapseWhitespace: false,
        removeAttributeQuotes: false
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      chunksSortMode: 'none'
    }))

    rewrites.push({from: new RegExp(`^/${item}/.*`), to: `/${item}/index.html`})

    runningPrompt.push(`模块: ${item} → http://${utils.getLocalAddress()}:${config.dev.port}/${item}`)
  });

  plugin.push(new FriendlyErrorsPlugin({
    compilationSuccessInfo: {
      messages: runningPrompt
    },
    onErrors: config.dev.notifyOnErrors
      ? utils.createNotifierCallback()
      : undefined
  }))

  return { plugin, entry, rewrites }
}

exports.getProConfig = function (module) {

  let entry = `./src/modules/${module}/main.js`

  let output = {
    path: path.join(config.build.assetsRoot, module),
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    // publicPath: path.join('/', module, '/')
  }

  let plugin = new HtmlWebpackPlugin({
    filename: path.resolve(__dirname, `../dist/${module}/index.html`),
    template: path.resolve(__dirname, `../src/modules/${module}/index.html`),
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    // chunksSortMode: 'dependency',
    chunksSortMode: 'none',
    process: {
      env: require('../config/prod.env')
    }
  })

  return { plugin, entry, output }
}
