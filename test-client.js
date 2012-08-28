var ioClient = require('socket.io-client');

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