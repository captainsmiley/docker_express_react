var express = require('express');
var app = require('./express_app');


if(process.env.NODE_ENV == 'development')
{
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('../../webpack.dev.js');
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  watchOptions: {
     poll: true
  },
}));
app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));
//app.use(require("webpack-hot-middleware")(compiler));
console.log('chlear chache on file change');
var chokidar = require('chokidar')
var watcher = chokidar.watch('routes')
watcher.on('ready', function() {
  watcher.on('all', function() {
    console.log("Clearing /dist/ module cache from server")
    Object.keys(require.cache).forEach(function(id) {
      if (/[\/\\]routes[\/\\]/.test(id)) delete require.cache[id]
    })
  })
})



}
else if (process.env.NODE_ENV == 'production') {


}


app.use(express.static(__dirname +'./../../')); //serves the index.html
app.listen(3000); //listens on port 3000 -> http://localhost:3000/
