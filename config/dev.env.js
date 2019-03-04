'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  vueRuntime: '//cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.runtime.js'
})
