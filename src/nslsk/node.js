
/**
 * Module dependencies.
 */

const net = require('net');

const Stream = require('stream');
const Buffers = require('buffers');
const debug = require('debug')('nslsk:node');
const Message = require('./message');

export default Node;

/**
 * Default Soulseek server.
 */

var host = 'server.slsknet.org';

/**
 * Default Soulseek port.
 */

var port = 2242;

/**
 * Node constructor.
 */

function Node(socket, options) {
  Stream.call(this);
  
  if (null == options) {
    options = socket;
    
    options = options || {};
    options.host = options.host || host;
    options.port = options.port || port;
    
    socket = net.createConnection(options.port, options.host);
  }
  
  this.socket = socket;
  this.bind(this.socket);
}

/**
 * Inherits from `Stream`.
 */

Node.prototype.__proto__ = Stream.prototype;

/**
 * Bind socket with node.
 *
 * @param {net.Socket} socket
 */

Node.prototype.bind = function(socket) {
  let self = this, remain = 0, buffers = new Buffers();
  
  socket.on('data', data => {
    debug('[%s] data: %s:%s (%s bytes received)', self.type, socket.remoteAddress, socket.remotePort, data.length);
    buffers.push(data);
    
    if (buffers.length < 4) return;
    if (remain < 1) remain = buffers.splice(0, 4).toBuffer().readUInt32LE(0);
    if (remain > buffers.length) return;
    
    const message = new Message(buffers.splice(0, remain));
    
    message.decode(self.type, (err, decoded) => {
      // TODO: handle error.
      decoded._message = message;
      self.emit('message', decoded);
      self.emit(message.name, decoded);
    });

    remain = 0;
  });
  
  socket.on('connect', () => {
    debug('[%s] connect: %s:%s', self.type, socket.remoteAddress, socket.remotePort);
    self.emit('connect', self);
  });
  
  socket.on('close', () => {
    debug('[%s] close: %s:%s', self.type, socket.remoteAddress, socket.remotePort);
    self.emit.apply(self, ['close'].concat([].slice.call(arguments)));
  });
  
  socket.on('timeout', () => {
    debug('[%s] timeout: %s:%s', self.type, socket.remoteAddress, socket.remotePort);
    self.emit.apply(self, ['timeout'].concat(arguments));
  });
  
  socket.on('error', () => {
    debug('[%s] error: %s:%s', self.type, socket.remoteAddress, socket.remotePort);
    self.emit.apply(self, ['error'].concat([].slice.call(arguments)));
  });
};

/**
 * @param {Buffer|Buffers} data
 */

Node.prototype.write = function(data) {
  if (data instanceof Buffers) data = data.toBuffer();
  debug('send [%s]: %s', this.type, data.toString('hex'));
  return this.socket.write(data);
};