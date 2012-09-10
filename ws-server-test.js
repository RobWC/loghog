var WSServer = require('./lib/ws-server.js').WSServer;
var mongoSave = require('./lib/mongo-save.js').MongoSaver;
var configManager = require('./lib/config-manager.js').ConfigManager;
var util = require('util');

///TEST IMPLEMENTATION
var wsServer = new WSServer(2000);
var cfg = configManager.parse('./server-test.cfg');
var mongoSv = new mongoSave(cfg.config.mongo.server,cfg.config.mongo.port,cfg.config.mongo.database,cfg.config.mongo.collection,wsServer,'logs');
wsServer.start();
mongoSv.listen();

wsServer.on('logs', function(data){
  util.log(util.inspect(data))
  //we need to insert this into mongodb lets try doing it directly O_o
  //console.log('XXXX')
  
});

wsServer.on('telme', function(data){
  //util.log(util.inspect(data))
  //console.log('XXXX')
});

wsServer.on('control', function(data){
  //util.log(util.inspect(data))
  //console.log('XXXX')
});