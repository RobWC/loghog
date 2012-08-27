var dgram = require("dgram");
var util = require('util');
var events = require('events');

var UdpListener = function(port,protocol,parser) {
  events.EventEmitter.call(this);
  this.port = port;
  this.parser = parser;
  this.protocol = protocol;
};

util.inherits(UdpListener, events.EventEmitter);

exports.UdpListener = UdpListener;

UdpListener.listen = function() {
  var self = this;
  
  var server = dgram.createSocket(self.protocol);

  server.on("message", function(msg, rinfo) {
    self.parser.parse(msg);
  });

  server.on("listening", function() {
    var address = server.address();
    console.log("server listening " + address.address + ":" + address.port);
  });

  server.bind(listenPort);
};