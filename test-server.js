var io = require('socket.io').listen(2000);

io.sockets.on('connection', function (socket) {
  socket.emit('hello', { hello: 'world' });
  
  socket.on('whogivesafuck', function (data) {
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