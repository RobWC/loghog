var ioClient = require('socket.io-client');
var util = require('util');
var events = require('events');

var client = ioClient.connect('http://localhost:2000/logs?username=shoes&password=socks');

client.on('connect', function () {
  // socket connected
});

client.on('a message', function (data) {
  // server emitted a custom event
  console.log(data);
});

client.on('disconnect', function () {
  // socket disconnected
});

client.send('hello');

var WSClient = function(url,options) {
  events.EventEmitter.call(this);
  this.url = url;
  this.options = options;
  this.client;
};

util.inherits(WSClient, events.EventEmitter);

WSClient.conenct = function(callback,options) {
  var self = this;
    
  self.client = ioClient.connect(self.url);
  
  self.client.on('connect', function() {
    util.log('Client Connected')
  });
  
  if (callback) {
    callback(options);
  };  
  
};

//callback recieves data
WSClient.subscribe = function(channel,callback) {
  var self = this;
  
  self.client.on(channel,callback(data));
};

WSClient.send = function(channel,message) {
  var self = this;
  
  self.client.emit(channel,message);
};