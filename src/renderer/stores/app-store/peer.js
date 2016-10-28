import Node from './node'
import message from './message'

export default class Peer extends Node {
  constructor(socket) {
    super()
    this.type = 'peer'
  }

  pierceFirewall(token) {
    message()
      .uchar(message.PEER.PIERCE_FIREWALL)
      .uint32(token)
      .end(this.write.bind(this))
    return this
  }

  peerInit(localUsername, type, token) {
    message()
      .uchar(message.PEER.PEER_INIT)
      .string(localUsername)
      .string(type)
      .uint32(token)
      .end(this.write.bind(this))
    return this
  }

  sharesRequest() {
    message(message.PEER.SHARES_REQUEST).end(this.write.bind(this))
    return this
  }

  infoRequest() {
    message()
      .uchar(message.PEER.INFO_REQUEST)
      .end(this.write.bind(this))
    return this
  }
}
