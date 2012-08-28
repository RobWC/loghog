var ioClient = require('socket.io-client');

var options = {
  
};

var client = ioClient.connect('http://localhost:2000?username=shoes&password=socks');

client.on('connect', function () {
  // socket connected
});

client.on('custom event', function () {
  // server emitted a custom event
});

client.on('disconnect', function () {
  // socket disconnected
});

client.send('hello');