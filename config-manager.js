var fs = require('fs');

var ConfigManager = new Object();

ConfigManager.parse = function(filename) {
  //test to see if file exists
  //if ok open file
  //return the JS Obj
  //the app needs to deal with its own config options
  var exists = fs.existsSync(filename);
  if (exists == false) {
    //file doesnt exist, throw error
    return {status:'error', fileExists: false, statusMsg: 'File does not exist!', config:{}};
  } else {
    //files exists, lets process it!
    var recieverCfgBuff = fs.readFileSync(filename);
    var config = new Object();
    config.config = JSON.parse(recieverCfgBuff.toString());
    config.status = 'ok';
    config.fileExists = true;
    config.statusMsg = 'Successfully processed';
    return config;
  };
};

exports.ConfigManager = ConfigManager;