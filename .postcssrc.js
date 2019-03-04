// https://github.com/michael-ciniawsky/postcss-load-config
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  "plugins": {
    "postcss-import": {
      alias: {
        '@': resolve('src')
      },
      resolve: function (id, basedir, importOptions) {
        let alias = id.split('/')[0].replace('~', '');

        return id.replace('~' + alias, importOptions.alias[alias]);
      }
    },
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    "postcss-px2rem-exclude": {
      remUnit: 37.5,
      exclude: /node_modules/i
    }
  }
}
