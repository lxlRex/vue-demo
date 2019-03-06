module.exports = {
  "presets": [
    ["@babel/preset-env", {"modules": false, "useBuiltIns": false}]
  ],
  "plugins": [
    ["@babel/plugin-proposal-class-properties", {"loose": true}],
    ["@babel/plugin-transform-runtime"],
    "@babel/plugin-syntax-dynamic-import",
    "babel-plugin-transform-vue-jsx",
  ]
}
