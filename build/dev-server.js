'use strict'

const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('../config')
const webpackDevConfig = require('./webpack.dev.conf.js')

const server = new WebpackDevServer(Webpack(webpackDevConfig), webpackDevConfig.devServer)

server.listen(config.dev.port, config.dev.host)
