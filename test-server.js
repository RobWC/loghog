var io = require('socket.io').listen(2000);

io.configure(function () {
  io.set('transports', ['websocket']);
   io.set('authorization', function (handshakeData, callback) {
    console.log(handshakeData);
    callback(null, true); // error first callback style 
  });
  io.enable('log');
});


io.sockets.on('connection', function (socket) {
  console.log(socket);
  socket.emit('hello', { hello: 'world' });
  
  socket.on('message', function (data) {
    console.log(data);
  });
  
});

var chat = io
  .of('/logs')
  .on('connection', function (socket) {
    socket.emit('a message', {
        that: 'only'
      , '/chat': 'will get'
    });
    chat.emit('a message', {
        everyone: 'in'
      , '/chat': 'will get'
    });
  });