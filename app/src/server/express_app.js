var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var tgtest_route = require('./routes/tgtest');
var esp_udp_route = require('./routes/esp_udp');




var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(require('./sse.js'));
app.use('/esp_udp',esp_udp_route);
app.use('/tgtest',tgtest_route);





module.exports = app;
