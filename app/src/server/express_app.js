var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var tgtest_route = require('./routes/tgtest');




var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(require('./sse.js'));
app.use('/tgtest',tgtest_route);





module.exports = app;
