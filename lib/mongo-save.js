var Db = require("mongodb").Db;
var Connection = require("mongodb").Connection;
var Server = require("mongodb").Server;
var util = require('util');
var events = require('events');

var MongoSaver = function(host,port,database,collection,emitter,saveOn) {
  events.EventEmitter.call(this);
  this.host = host;
  this.port = port;
  this.emitter = emitter;
  this.database = database;
  this.collection = collection;
  this.saveOn = saveOn;
  this.db = new Db(this.database, new Server(this.host,this.port,{}));
};

util.inherits(MongoSaver, events.EventEmitter);

exports.MongoSaver = MongoSaver;

MongoSaver.prototype.listen = function() {
  var self = this;
  
  self.db.open(function(err, result) {
    self.emitter.on(self.saveOn, function(data) {
      self.db.collection(self.collection, function(err, collection) {
        collection.insert(data);
      });
    });
  });
  
};
