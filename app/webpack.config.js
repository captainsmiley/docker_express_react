var webpack = require('webpack');
var path = require('path');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
//const CleanWebpackPlugin = require('clean-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, './build');
var APP_DIR = path.resolve(__dirname, './src/client/');

console.log('tgtest2');
const config = {
  mode: 'development',
  context: __dirname,
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',

    APP_DIR + '/index.js'
  ],
  devtool: 'inline-source-map',
  //unshift: "webpack-dev-server/client?http://localhost:3000/"
  watch: false,
  watchOptions: {
    poll: true
  },

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
  resolve: {
    modules: ['/dep/node_modules/','node_modules']
  },
  resolveLoader: {
    modules: ['/dep/node_modules/','node_modules']
  },
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /(\.css|.scss)$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        },
/*
        {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        },
*/
        {
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
