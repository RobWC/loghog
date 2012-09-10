var util = require('util');
var events = require('events');

var WSClient = function(url,options) {
  events.EventEmitter.call(this);
  this.url = url;
  this.options = options;
  this.ioClient = require('socket.io-client');
  this.client;
  this.channels = new Object();
};

util.inherits(WSClient, events.EventEmitter);

exports.WSClient = WSClient;

WSClient.prototype.conenct = function(callback,options) {
  var self = this;
    
  self.client = self.ioClient.connect(self.url);
  
  self.client.on('connect', function() {
    util.log('Client Connected')
  });
  
  self.client.on('control', function(data){
    console.log(data);
  })
  
  if (callback) {
    callback(options);
  };  
  
};

//callback recieves data
WSClient.prototype.subscribe = function(channel,callback) {
  var self = this;
  
  self.channels[channel] = true;
  
  self.client.on(channel,callback);
};

WSClient.prototype.unsubscribe = function(channel,callback) {
  var self = this;
  
  self.channels[channel] = false;
  
  self.client.removeListener(channel,callback);
};

WSClient.prototype.send = function(channel,message) {
  var self = this;
  
  self.client.emit(channel,message);
};