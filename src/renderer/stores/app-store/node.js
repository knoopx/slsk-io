import net from 'net'
import Stream from 'stream'
import Buffers from 'buffers'
import Message from './message'

const host = 'server.slsknet.org'
const port = 2242

export default class Node extends Stream {
  constructor(socket, options) {
    super()

    if (options == null) {
      options = socket
      options = options || {}
      options.host = options.host || host
      options.port = options.port || port
    }

    this.socket = net.createConnection(options.port, options.host)
    this.bind(this.socket)
  }

  bind(socket) {
    const self = this
    let remain = 0
    const buffers = new Buffers()

    socket.on('data', (data) => {
      console.debug('[%s] data: %s:%s (%s bytes received)', self.type, socket.remoteAddress, socket.remotePort, data.length)
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
      console.debug('[%s] connect: %s:%s', self.type, socket.remoteAddress, socket.remotePort)
      self.emit('connect', self)
    })

    socket.on('close', () => {
      console.debug('[%s] close: %s:%s', self.type, socket.remoteAddress, socket.remotePort)
      self.emit(...['close'].concat([].slice.call(arguments)))
    })

    socket.on('timeout', () => {
      console.debug('[%s] timeout: %s:%s', self.type, socket.remoteAddress, socket.remotePort)
      self.emit(...['timeout'].concat(arguments))
    })

    socket.on('error', () => {
      console.debug('[%s] error: %s:%s', self.type, socket.remoteAddress, socket.remotePort)
      self.emit(...['error'].concat([].slice.call(arguments)))
    })
  }

  write(data) {
    if (data instanceof Buffers) data = data.toBuffer()
    console.debug('send [%s]: %s', this.type, data.toString('hex'))
    return this.socket.write(data)
  }
}
