const merge = require('webpack-merge');
const common = require('./webpack.common.js');

var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './build');
var APP_DIR = path.resolve(__dirname, './src/client/');

module.exports = merge(common, {

  mode: 'production',
  entry: {
    app: APP_DIR + '/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR,
  }

});
