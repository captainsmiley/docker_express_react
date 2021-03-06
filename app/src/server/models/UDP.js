"use strict";
var PORT = 11000;
var HOST = '127.0.0.1';

var dgram = require('dgram');

module.exports = class UdpServer {
  constructor(callback) {
    this.id = 1;
    this.handleListening = this.handleListening.bind(this);
    this.handleMsg = this.handleMsg.bind(this);
    this.userCallback = callback;
    this.server = null;

  }

  handleMsg(message, remote) {
      //console.log(remote.address + ':' + remote.port +' - ' + message);
      //console.log('');
      //console.log('');
      this.userCallback(message);
  }


  handleListening() {
    var address = this.server.address();
    //var id = this.id;

    //console.log(id);
    console.log('UDP Server listening on ' + address.address + ":" + address.port + '\n');
    console.log('');
  }

  send_tgtest() {

    var message = new Buffer('My KungFu is Good!');
    var client = dgram.createSocket('udp4');
    client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
      if (err) throw err;
      console.log('UDP message sent to ' + '192.168.99.100' +':'+ PORT);
      client.close();
    });
  }


  start() {
    this.server = dgram.createSocket('udp4');
    this.server.on('listening',this.handleListening);
    this.server.on('message', this.handleMsg);
    this.server.on('error', (err) => {
      console.log(`server error:\n${err.stack}`);
      server.close();
    });

    //this.server.close();
    this.server.bind(PORT);
    //console.log(this.server.address());
  }
  stop() {
    if(this.server) {
      this.server.close();
      this.server = null;
    }
  }

}
