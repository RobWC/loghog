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

//TEST IMPLEMENTATION
var configManager = require('./config-manager.js').ConfigManager;
var udpListener = require('./udp-listener.js').UdpListener;
var logParser = require('./logparser.js').LogParser;

var parser = new logParser();
var cfg = configManager.parse('./test.cfg');
var udpServer = new udpListener(cfg.config.listener.port,cfg.config.listener.type,parser);
udpServer.listen();
  
var wsClient = new WSClient('http://localhost:2000?username=shoes&password=socks');
wsClient.conenct();
wsClient.emit('logs','hello')

parser.on('save',function(data){
  wsClient.send('logs',data);
})