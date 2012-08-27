var cluster = require("cluster");
var numCPUs = require("os").cpus().length;
//
var mongoSave = require('./mongo-save.js').mongoSaver;
var configManager = require('./config-manager.js').ConfigManager;
var udpListener = require('./udp-listener.js').UdpListener;
var logParser = require('./logparser.js').LogParser;

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  };

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
  
} else {
  var parser = new logParser();
  var cfg = configManager.parse('./test.cfg');
  var udpServer = new UdpListener(cfg.config.port,cfg.config.type,parser);
};