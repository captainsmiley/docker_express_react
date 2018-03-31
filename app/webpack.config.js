var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './build');
var APP_DIR = path.resolve(__dirname, './src/client/');

console.log('tgtest2');
const config = {
   entry: {
     main: APP_DIR + '/index.js'
     //unshift: "webpack-dev-server/client?http://localhost:3000/"
   },
   watchOptions: {
        poll: true
    },
   resolve: {
      modules: ['/dep/node_modules/','node_modules']
},
resolveLoader: {
      modules: ['/dep/node_modules/','node_modules']
},
   output: {
     filename: 'bundle.js',
     path: BUILD_DIR,
   },
   module: {
    rules: [
     {
       test: /(\.css|.scss)$/,
       use: [{
           loader: "style-loader" // creates style nodes from JS strings
       }, {
           loader: "css-loader" // translates CSS into CommonJS
       }, {
           loader: "sass-loader" // compiles Sass to CSS
       }]
     },

     {
       test: /\.(jsx|js)?$/,
       exclude: /node_modules/,
       use: [{
         loader: "babel-loader",

         options: {
           cacheDirectory: true,
           presets: ['react', 'es2015'] // Transpiles JSX and ES6
         }
       }]
     }
    ],

  }
};

module.exports = config;