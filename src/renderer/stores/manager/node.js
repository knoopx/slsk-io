import net from 'net'
import Stream from 'stream'
import Buffers from 'buffers'
import debugImport from 'debug'
import Message from './message'

const debug = debugImport('nslsk:node')


/**
 * Default Soulseek server.
 */

const host = 'server.slsknet.org'

/**
 * Default Soulseek port.
 */

const port = 2242

/**
 * Node constructor.
 */

export default class Node {
  constructor(socket, options) {
    Stream.call(this)

    if (options == null) {
      options = socket

      options = options || {}
      options.host = options.host || host
      options.port = options.port || port

      socket = net.createConnection(options.port, options.host)
    }

    this.socket = socket
    this.bind(this.socket)
  }

  /**
   * Bind socket with node.
   *
   * @param {net.Socket} socket
   */

  bind(socket) {
    const self = this
    let remain = 0
    const buffers = new Buffers()

    socket.on('data', (data) => {
      debug('[%s] data: %s:%s (%s bytes received)', self.type, socket.remoteAddress, socket.remotePort, data.length)
      buffers.push(data)

      if (buffers.length < 4) return
      if (remain < 1) remain = buffers.splice(0, 4).toBuffer().readUInt32LE(0)
      if (remain > buffers.length) return

      const message = new Message(buffers.splice(0, remain))

      message.decode(self.type, (err, decoded) => {
        // TODO: handle error.
        decoded._message = message
        self.emit('message', decoded)
        self.emit(message.name, decoded)
      })

      remain = 0
    })

    socket.on('connect', () => {
      debug('[%s] connect: %s:%s', self.type, socket.remoteAddress, socket.remotePort)
      self.emit('connect', self)
    })

    socket.on('close', () => {
      debug('[%s] close: %s:%s', self.type, socket.remoteAddress, socket.remotePort)
      self.emit(...['close'].concat([].slice.call(arguments)))
    })

    socket.on('timeout', () => {
      debug('[%s] timeout: %s:%s', self.type, socket.remoteAddress, socket.remotePort)
      self.emit(...['timeout'].concat(arguments))
    })

    socket.on('error', () => {
      debug('[%s] error: %s:%s', self.type, socket.remoteAddress, socket.remotePort)
      self.emit(...['error'].concat([].slice.call(arguments)))
    })
  }

  /**
   * @param {Buffer|Buffers} data
   */

  write(data) {
    if (data instanceof Buffers) data = data.toBuffer()
    debug('send [%s]: %s', this.type, data.toString('hex'))
    return this.socket.write(data)
  }
}

/**
 * Inherits from `Stream`.
 */

Node.prototype.__proto__ = Stream.prototype
