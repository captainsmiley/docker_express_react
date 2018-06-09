var express = require('express');
var router = express.Router();
var UdpServer = require('../models/UDP.js');
var request = require('request');
var Esp = require('../models/Esp.js')
var esp = new Esp();


var connections = []

function sendEventMsg(msg)
{
  for(var i = 0; i < connections.length; i++) {
    connections[i].sseSend(msg);
  }
}
function udpRecived(msg)
{
  //console.log(msg.toString());
  sendEventMsg(esp.UdpRecived(msg.toString()));
}

var Udp = new UdpServer( udpRecived);

/* GET home page. */
router.get('/', function(req, res) {
  res.json("esp_udp");
});

router.get('/start/', function(req,res) {
  Udp.stop();
  Udp.start();
  console.log('Start udp');
  request('http://192.168.0.184/start_udp', function (error, response, body) {
      console.log("Response:")
      console.log('error:', error); // Print the error if one occurred and handle it
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body: ', body);
      console.log(' ');
    });
  res.json("start udp");
})
router.get('/stop/', function(req,res) {
  Udp.stop();
  console.log('Stop udp');
  res.json("Stop udp");
})


router.get('/test_send/',function(req,res) {
  sendEventMsg('Test send');
  res.json('testing');
});

router.get('/stream/', function(req,res) {
  res.sseSetup();
  connections.push(res);
});


module.exports = router;
