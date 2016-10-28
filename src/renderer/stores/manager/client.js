
import crypto from 'crypto'
import message from './message'
import utils from './utils'
import Node from './node'

/**
 * Soulseek client version.
 */

const version = 182

/**
 * Soulseek client minior version.
 */

const minor = 1

export default Client

/**
 * Client constructor.
 *
 * @param {net.Socket|Object} socket
 * @param {Object} options [optional]
 */

class Client {
  constructor(socket, options) {
    Node.apply(this, arguments)
    this.type = 'server'
  }

  /**
   * Login.
   *
   * @param {String} username
   * @param {String} password
   * @return {Client}
   */

  login(username, password) {
    message(message.SERVER.LOGIN)
      .string(username)
      .string(password)
      .uint32(version)
      .string(utils.md5(username.concat(password)))
      .uint32(minor)
      .end(this.write.bind(this))
    return this
  }

  /**
   * File search.
   *
   * @param {String} query
   * @return {Client}
   */

  fileSearch(query, ticket) {
    if (ticket == null) {
      ticket = crypto.randomBytes(4).readUInt32LE()
    }

    message(26)
      .int32(ticket)
      .string(query)
      .end(this.write.bind(this))
    return ticket
  }

  /**
   * Search request.
   *
   * @return {Client}
   */

  searchRequest() {
    message(message.SERVER.SEARCH_REQUEST).end(this.write.bind(this))
    return this
  }

  /**
   * Connect to peer.
   *
   * @param {Number} token
   * @param {String} username
   * @param {String} type
   * @return {Client}
   */

  connectToPeer(token, username, type) {
    message(message.SERVER.CONNECT_TO_PEER)
      .uint32(token)
      .string(username)
      .string(type)
      .end(this.write.bind(this))
    return this
  }

  /**
   * Get status.
   *
   * @param {String} username
   * @return {Client}
   */

  getStatus(username) {
    message(message.SERVER.GET_STATUS)
      .string(username)
      .end(this.write.bind(this))
    return this
  }

  /**
   * Privileged users.
   *
   * @return {Client}
   */

  privilegedUsers() {
    message(message.SERVER.PRIVILEGED_USERS).end(this.write.bind(this))
    return this
  }

  /**
   * Set listen port.
   *
   * @param {Number} port
   * @return {Client}
   */

  setListenPort(port) {
    message(message.SERVER.SET_LISTEN_PORT)
      .uint32(port)
      .end(this.write.bind(this))
    return this
  }

  /**
   * Get peer address.
   *
   * @param {String} username
   * @return {Client}
   */

  getPeerAddress(username) {
    message(message.SERVER.GET_PEER_ADDRESS)
      .string(username)
      .end(this.write.bind(this))
    return this
  }

  /**
   * Add user.
   *
   * @param {String} username
   * @return {Client}
   */

  addUser(username) {
    message(message.SERVER.ADD_USER)
      .string(username)
      .end(this.write.bind(this))
    return this
  }

  /**
   * Say in chat room.
   *
   * @param {String} room
   * @param {String} message
   * @return {Client}
   */

  sayInChatRoom(room, message) {
    message(message.SERVER.SAY_IN_CHAT_ROOM)
      .string(room)
      .string(message)
      .end(this.write.bind(this))
    return this
  }

  /**
   * Join a room.
   *
   * @param {String} room
   * @return {Client}
   */

  joinRoom(room) {
    message(message.SERVER.JOIN_ROOM)
      .string(room)
      .end(this.write.bind(this))
    return this
  }

  /**
   * Leave room.
   *
   * @param {String} room
   * @return {Client}
   */

  leaveRoom(room) {
    message(message.SERVER.LEAVE_ROOM)
      .string(room)
      .end(this.write.bind(this))
    return this
  }

  /**
   * Room list.
   *
   * @return {Client}
   */

  roomList() {
    message(message.SERVER.ROOM_LIST).end(this.write.bind(this))
    return this
  }

  /**
   * Set room ticker.
   *
   * @param {String} room
   * @param {String} ticker
   * @return {Client}
   */

  setRoomTicker(room, ticker) {
    message(message.SERVER.SET_ROOM_TICKER)
      .string(room)
      .string(ticker)
      .end(this.write.bind(this))
    return this
  }

  /**
   * Get user stats.
   *
   * @param {String} username
   * @return {Client}
   */

  getUserStats(username) {
    message(message.SERVER.GET_USER_STATS)
      .string(username)
      .end(this.write.bind(this))
    return this
  }

  /**
   * Acknowledge private messsage.
   *
   * @param {Number} messageID
   * @return {Client}
   */

  acknowledgePrivateMessage(messageID) {
    message(message.SERVER.ACKNOWLEDGE_PRIVATE_MESSAGE)
      .int32(messageID)
      .end(this.write.bind(this))
    return this
  }

  /**
   * Set online status.
   *
   * @param {Number} status
   * @return {Client}
   */

  setOnlineStatus(status) {
    message(message.SERVER.SET_ONLINE_STATUS)
      .int32(status)
      .end(this.write.bind(this))
    return this
  }

  /**
   * Ping.
   *
   * @return {Client}
   */

  ping() {
    message(message.SERVER.PING).end(this.write.bind(this))
    return this
  }

  /**
   * Send speed.
   *
   * @param {String} username
   * @param {Number} speed
   * @return {Client}
   */

  sendSpeed(username, speed) {
    message(message.SERVER.SEND_SPEED)
      .string(username)
      .int32(speed)
      .end(this.write.bind(this))
    return this
  }

  /**
   * Shared folders & files.
   *
   * @param {Number} dirs
   * @param {Number} files
   * @return {Client}
   */

  sharedFoldersAndFiles(dirs, files) {
    message(message.SERVER.SHARED_FOLDERS_AND_FILES)
      .int32(dirs)
      .int32(files)
      .end(this.write.bind(this))
    return this
  }

  /**
   * Check privileges.
   *
   * @return {Client}
   */

  checkPrivileges() {
    message(message.SERVER.CHECK_PRIVILEGES).end(this.write.bind(this))
    return this
  }

  /**
   * Have no parents
   *
   * @param {Boolean} haveParents
   * @return {Client}
   */

  haveNoParents(haveParents) {
    message(message.SERVER.HAVE_NO_PARENTS)
      .bool(haveParents)
      .end(this.write.bind(this))
    return this
  }
}

/**
 * Inherits from `Node`.
 */

Client.prototype.__proto__ = Node.prototype
