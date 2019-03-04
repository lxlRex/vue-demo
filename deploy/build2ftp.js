'use strict'
require('../build/check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('../build/webpack.prod.conf')
const utils = require('../build/utils')

const deployConfig = require('./config')
const WebpackSftpClient = require('webpack-sftp-client');
const { getProConfig } = require('../build/mpa-config')

// 添加上传配置
webpackConfig.plugins.push(
  new WebpackSftpClient(Object.assign({
    path: config.build.assetsRoot,
    // Show details of uploading for files
    verbose: true
  },deployConfig.ftp))
);

// const spinner = ora('building for production...')
// spinner.start()

rm(path.join(config.build.assetsRoot), err => {
  if (err) throw err

  utils.getModules().forEach(module => {

    // 添加开发配置
    let { plugin, entry, output } = getProConfig(module)
    webpackConfig.entry = entry
    webpackConfig.output = output
    webpackConfig.plugins = webpackConfig.plugins.filter(plugin => {
      return plugin.constructor.name !== 'HtmlWebpackPlugin';
    });
    webpackConfig.plugins.push(plugin)


    webpack(webpackConfig, (err, stats) => {
      // spinner.stop()
      if (err) throw err
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        chunks: false,
        chunkModules: false
      }) + '\n\n')

      if (stats.hasErrors()) {
        console.log(chalk.red(`${module} Build failed with errors.\n`))
        process.exit(1)
      }

      console.log(chalk.cyan(`${module} Build complete.\n`))
      console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
      ))
    })
  })
   
})
