var configManager = require('./lib/config-manager.js').ConfigManager;
var udpListener = require('./lib/udp-listener.js').UdpListener;
var logParser = require('./lib/logparser.js').LogParser;
var WSClient = require('./lib/ws-client.js').WSClient;

var parser = new logParser();
var cfg = configManager.parse('./test.cfg');
var udpServer = new udpListener(cfg.config.listener.port,cfg.config.listener.type,parser);
udpServer.listen();
  
var wsClient = new WSClient('https://localhost:2000?username=shoes&password=socks');
wsClient.conenct();
wsClient.emit('logs','hello')

parser.on('save',function(data){
  wsClient.send('logs',data);
})