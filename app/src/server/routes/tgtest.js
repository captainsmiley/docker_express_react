var express = require('express');
var router = express.Router();
var nmap = require('node-nmap');
var UdpServer = require('../models/UDP.js');
var Udp = new UdpServer();
var NetworkUtils = require('../utils/NetworkUtils.js');
var NetUtils = new NetworkUtils();

nmap.nmapLocation = "nmap"; //default


var scan_data = null;

var connections = []

function sendEventMsg(msg)
{
  for(var i = 0; i < connections.length; i++) {
    connections[i].sseSend(msg);
  }
}

/* GET home page. */
router.get('/', function(req, res) {
  res.json([
    {name: 'tgtest1', id: 4},
    {name: 'tgtest2', id: 2},
    {name: 'tgtest3', id: 3}

  ]);
});

router.get('/test/', function(req,res) {
  //Udp.start();
  console.log(' ');

  res.json("start");

})
router.get('/test2/', function(req,res) {
  //Udp.send_tgtest();
  //console.log(' ');
  NetUtils.print_ifs();

  res.json("print ifs");

})



router.get('/scan_result/',function(req,res) {
    res.json(scan_data);
});


router.get('/scan/',function(req,res) {
  //sendEventMsg('Scan starts');

  var scan = new nmap.NmapScan('192.168.0.1-100',['-p 80']);
  scan.on('complete', function(data) {
    scan_data = data;
    sendEventMsg('Scan complete');
  });
  scan.on('error', function(error) {
    console.log(error);
  });
  scan.startScan();
  res.json('scanning');
  //res.render('tgtest', { title: 'tgtest' });
});

router.get('/stream/', function(req,res) {
  res.sseSetup();
  //res.sseSend('tgtest');
  connections.push(res);

});


router.post('/scan/', function(req,res){
  console.log(req.body);
  console.log(' ');
  var nmapc = req.body;
  var scan = new nmap.NmapScan(nmapc.command,nmapc.args);
  scan.on('complete', function(data) {
    scan_data = data;
    sendEventMsg('Scan complete');
  });
  scan.on('error', function(error) {
    console.log(error);
  });
  scan.startScan();
  sendEventMsg('Scan started');
  res.json('scanning');
  //res.send(req.body);

});

router.get('/test_scan_result/', function(req,res) {
  res.json(
    [{"hostname":null,"ip":"192.168.0.1","mac":null,"openPorts":[{"port":80,"protocol":"tcp","service":"http","method":"table"}],"osNmap":null},{"hostname":null,"ip":"192.168.0.2","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.3","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.4","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.5","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.6","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.7","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.8","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.9","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.10","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.11","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.12","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.13","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.14","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.15","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.16","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.17","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.18","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.19","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.20","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.21","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.22","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.23","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.24","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.25","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.26","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.27","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.28","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.29","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.30","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.31","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.32","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.33","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.34","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.35","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.36","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.37","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.38","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.39","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.40","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.41","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.42","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.43","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.44","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.45","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.46","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.47","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.48","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.49","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.50","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.51","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.52","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.53","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.54","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.55","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.56","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.57","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.58","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.59","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.60","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.61","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.62","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.63","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.64","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.65","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.66","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.67","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.68","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.69","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.70","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.71","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.72","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.73","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.74","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.75","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.76","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.77","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.78","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.79","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.80","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.81","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.82","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.83","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.84","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.85","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.86","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.87","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.88","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.89","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.90","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.91","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.92","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.93","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.94","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.95","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.96","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.97","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.98","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.99","mac":null,"openPorts":[],"osNmap":null},{"hostname":null,"ip":"192.168.0.100","mac":null,"openPorts":[],"osNmap":null}]
  )
});

module.exports = router;
