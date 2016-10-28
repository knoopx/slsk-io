
/**
 * Module dependencies.
 */

var net = require('net')
  , crypto = require('crypto')
  , util = require('util')
  , inspect = util.inspect
  , debug = require('debug')('nslsk:manager')
  , EventEmitter = require('events').EventEmitter
  , Message = require('./message')
  , Client = require('./client')
  , Peer = require('./peer')
  , utils = require('./utils');

export default Manager;

/**
 * Manager constructor.
 */

function Manager(port) {
  var self = this;

  EventEmitter.call(this);

  this.port = port || 2234;

  this.client = new Client();

  this.peers = {};
  this.tickets = {};
  this.searches = {};

  this.client.on('connect', client => {
    var num = 0;
    self.peer = net.createServer(socket => {
      debug('[%s] connection from peer %s:%s', ++num, socket.remoteAddress, socket.remotePort);
      var peer = new Peer(socket);
      peer.infoRequest();
    });
    self.peer.listen(self.port, () => {
      debug('listening on port %s', self.port);
    });
    self.emit('connect', client);
  });

  this.client.on('login', this.onLogin.bind(this));
  this.client.on('connect to peer', this.onConnectToPeer.bind(this));
  this.client.on('privileged users', this.onPriviledgedUsers.bind(this));
  this.client.on('get status', this.onGetStatus.bind(this));
}

/**
 * Inherits from `EventEmitter`.
 */

Manager.prototype.__proto__ = EventEmitter.prototype;

/**
 * @param {Message} message
 */

Manager.prototype.onLogin = function(message) {
  this.client.setListenPort(this.port);
};

/**
 * @param {Message} src/nslsk
 */

Manager.prototype.onPriviledgedUsers = function(message) {
  var client = this.client;
  message.users.forEach((username, index) => {
    // client.getStatus(username);
  });
};

/**
 * @param {Message} message
 */

Manager.prototype.onGetStatus = function(message) {

};

/**
 * @param {Message} message
 */

Manager.prototype.onConnectToPeer = function(message) {
  var ip = message.ip
    , port = message.port
    , username = message.username
    , token = message.token
    , peer = this.peers[username] = new Peer({ host: ip, port: port });

  peer.on('connect', peer => {
    debug('connect with %s', username);
    peer.on('message', message => {
      debug('peer message from %s: %s', username, inspect(message, false, 4, true));
    });
    peer.pierceFirewall(token);
  });

  peer.on('error', err => {
    debug('connect error with %s [%s]', username, err.code);
  });
};
