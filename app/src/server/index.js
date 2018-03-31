var express = require('express');

var app = require('./express_app');


console.log('tgtest3');

app.use(express.static(__dirname +'./../../')); //serves the index.html
app.listen(3000); //listens on port 3000 -> http://localhost:3000/
