
import net from 'net'
import { EventEmitter } from 'events'
import { observable } from 'mobx'
import Client from './client'
import Peer from './peer'

export default class Manager extends EventEmitter {
  @observable peers = {}
  @observable tickets = {}
  @observable searches = {}
  @observable rooms = []
  @observable users = []

  constructor(port) {
    super()
    this.port = port || 2234
    this.client = new Client()
    this.client.on('connect', (client) => {
      let num = 0
      this.peer = net.createServer((socket) => {
        console.debug('[%s] connection from peer %s:%s', ++num, socket.remoteAddress, socket.remotePort)
        const peer = new Peer(socket)
        peer.infoRequest()
      })
      this.peer.listen(this.port, () => {
        console.debug(`listening on port ${this.port}`)
      })
      this.emit('connect', client)
    })

    this.client.on('login', this.onLogin.bind(this))
    this.client.on('connect to peer', this.onConnectToPeer.bind(this))
    this.client.on('privileged users', this.onPriviledgedUsers.bind(this))
    this.client.on('get status', this.onGetStatus.bind(this))
  }

  onLogin(message) {
    this.client.setListenPort(this.port)
  }

  onPriviledgedUsers(message) {
    const client = this.client
    message.users.forEach((username, index) => {
      // client.getStatus(username)
    })
  }

  onGetStatus(message) {}

  onConnectToPeer(message) {
    const ip = message.ip
    const port = message.port
    const username = message.username
    const token = message.token
    const peer = this.peers[username] = new Peer({ host: ip, port })

    peer.on('connect', (peer) => {
      debug('connect with %s', username)
      peer.on('message', (message) => {
        debug('peer message from %s: %s', username, inspect(message, false, 4, true))
      })
      peer.pierceFirewall(token)
    })

    peer.on('error', (err) => {
      debug('connect error with %s [%s]', username, err.code)
    })
  }
}
