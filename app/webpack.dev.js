const merge = require('webpack-merge');
const common = require('./webpack.common.js');

var webpack = require('webpack');
var path = require('path');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
//const CleanWebpackPlugin = require('clean-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, './build');
var APP_DIR = path.resolve(__dirname, './src/client/');

module.exports = merge(common, {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',

    APP_DIR + '/index.js'
  ],
  devServer: {
    host: '0.0.0.0',
    contentBase: './dist',
    //hot: true,
    watchOptions: {
      poll: true
    }
  },
  plugins: [
    //new CleanWebpackPlugin(['dist']),
    //  new HtmlWebpackPlugin({
    //    title: 'Hot Module Replacement'
    //  }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR,
    publicPath: '/build/'
  },
  devtool: 'inline-source-map'
});
