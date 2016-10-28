
import Node from './node'
import message from './message'

export default Peer

/**
 * Peer constructor.
 */

class Peer {
  constructor(socket, options) {
    Node.apply(this, arguments)
    this.type = 'peer'
  }

  /**
   * Pierce firewall
   *
   * @param {Number} token
   * @return {Peer}
   */

  pierceFirewall(token) {
    message()
      .uchar(message.PEER.PIERCE_FIREWALL)
      .uint32(token)
      .end(this.write.bind(this))
    return this
  }

  /**
   * Peer init.
   *
   * @param {String} localUsername
   * @param {String} type
   * @param {Number} token
   * @return {Peer}
   */

  peerInit(localUsername, type, token) {
    message()
      .uchar(message.PEER.PEER_INIT)
      .string(localUsername)
      .string(type)
      .uint32(token)
      .end(this.write.bind(this))
    return this
  }

  /**
   * Shares request.
   *
   * @return {Peer}
   */

  sharesRequest() {
    message(message.PEER.SHARES_REQUEST).end(this.write.bind(this))
    return this
  }

  /**
   * Info request.
   *
   * @return {Peer}
   */

  infoRequest() {
    message()
      .uchar(message.PEER.INFO_REQUEST)
      .end(this.write.bind(this))
    return this
  }
}

/**
 * Inherits from `Node`.
 */

Peer.prototype.__proto__ = Node.prototype
