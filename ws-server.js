var util = require('util');
var events = require('events');
var fs = require('fs');

var privateKey = fs.readFileSync('./keys/server-np.key').toString();
var certificate = fs.readFileSync('./keys/server.crt').toString();
var ca = fs.readFileSync('./keys/ca.crt').toString();

var WSServer = function(port) {
  events.EventEmitter.call(this);
  this.port = port;
  this.ioServer = require('socket.io');
  this.io;
};

util.inherits(WSServer, events.EventEmitter);

WSServer.prototype.start = function() {
  var self = this;
  
  self.io = this.ioServer.listen(self.port,{key:privateKey,cert:certificate,ca:ca});
  
  self.io.configure(function () {
    self.io.set('transports', ['websocket']);
     self.io.set('authorization', function (handshakeData, callback) {
      handshakeQuery = handshakeData.query;
      if (handshakeQuery.username == 'shoes' && handshakeQuery.password == 'socks') {
        util.log('XXXX Authorized XXXX');
        handshakeData.username = handshakeQuery.username;
        callback(null, true); // error first callback style
      } else {
        callback(null,false);
      };
    });
    self.io.enable('log');
  });
  
  self.io.sockets.on('connection', function (socket) {
    socket.emit('control', { hello: 'world' });
      socket.on('logs',function(data){
        self.emit('logs',data);
      });
      socket.on('control',function(data){
        //process control messages for the client
        self.emit('control',data);
      });
      socket.on('telme',function(data){
        self.emit('telme',data);
      });
  });
  
  var callback = function(data) {
    console.log(data);
  };
};

///TEST IMPLEMENTATION

var wsServer = new WSServer(2000);
wsServer.start();

wsServer.on('logs', function(data){
  util.log(util.inspect(data))
  //console.log('XXXX')
});

wsServer.on('telme', function(data){
  //util.log(util.inspect(data))
  //console.log('XXXX')
});