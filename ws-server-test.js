var WSServer = require('./lib/ws-server.js').WSServer;
var mongoSave = require('./lib/mongo-save.js').MongoSaver;
var configManager = require('./lib/config-manager.js').ConfigManager;
var util = require('util');

///TEST IMPLEMENTATION
var cfg = configManager.parse('./ws-server-test.cfg');
var wsServer = new WSServer(cfg.wsServer.port);
var mongoSv = new mongoSave(cfg.config.mongo.server,cfg.config.mongo.port,cfg.config.mongo.database,cfg.config.mongo.collection,wsServer,config.mongo.saveOn);
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