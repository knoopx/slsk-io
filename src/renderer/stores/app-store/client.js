
import crypto from 'crypto'
import message from './message'
import { md5 } from './utils'
import Node from './node'

const version = 182
const minor = 1

export default class Client extends Node {
  constructor() {
    super()
    this.type = 'server'
  }

  login(username, password) {
    message(message.SERVER.LOGIN)
      .string(username)
      .string(password)
      .uint32(version)
      .string(md5(username.concat(password)))
      .uint32(minor)
      .end(this.write.bind(this))
    return this
  }

  fileSearch(query, ticket = crypto.randomBytes(4).readUInt32LE()) {
    message(26)
      .int32(ticket)
      .string(query)
      .end(this.write.bind(this))
    return ticket
  }

  searchRequest() {
    message(message.SERVER.SEARCH_REQUEST).end(this.write.bind(this))
  }

  connectToPeer(token, username, type) {
    message(message.SERVER.CONNECT_TO_PEER)
      .uint32(token)
      .string(username)
      .string(type)
      .end(this.write.bind(this))
  }

  getStatus(username) {
    message(message.SERVER.GET_STATUS)
      .string(username)
      .end(this.write.bind(this))
  }

  privilegedUsers() {
    message(message.SERVER.PRIVILEGED_USERS).end(this.write.bind(this))
  }

  setListenPort(port) {
    message(message.SERVER.SET_LISTEN_PORT)
      .uint32(port)
      .end(this.write.bind(this))
  }

  getPeerAddress(username) {
    message(message.SERVER.GET_PEER_ADDRESS)
      .string(username)
      .end(this.write.bind(this))
  }

  addUser(username) {
    message(message.SERVER.ADD_USER)
      .string(username)
      .end(this.write.bind(this))
  }

  sayInChatRoom(room, text) {
    message(message.SERVER.SAY_IN_CHAT_ROOM)
      .string(room)
      .string(text)
      .end(this.write.bind(this))
  }

  joinRoom(room) {
    message(message.SERVER.JOIN_ROOM)
      .string(room)
      .end(this.write.bind(this))
  }

  leaveRoom(room) {
    message(message.SERVER.LEAVE_ROOM)
      .string(room)
      .end(this.write.bind(this))
  }

  roomList() {
    message(message.SERVER.ROOM_LIST).end(this.write.bind(this))
  }

  setRoomTicker(room, ticker) {
    message(message.SERVER.SET_ROOM_TICKER)
      .string(room)
      .string(ticker)
      .end(this.write.bind(this))
  }

  getUserStats(username) {
    message(message.SERVER.GET_USER_STATS)
      .string(username)
      .end(this.write.bind(this))
  }

  acknowledgePrivateMessage(messageID) {
    message(message.SERVER.ACKNOWLEDGE_PRIVATE_MESSAGE)
      .int32(messageID)
      .end(this.write.bind(this))
  }

  setOnlineStatus(status) {
    message(message.SERVER.SET_ONLINE_STATUS)
      .int32(status)
      .end(this.write.bind(this))
  }

  ping() {
    message(message.SERVER.PING).end(this.write.bind(this))
  }

  sendSpeed(username, speed) {
    message(message.SERVER.SEND_SPEED)
      .string(username)
      .int32(speed)
      .end(this.write.bind(this))
  }

  sharedFoldersAndFiles(dirs, files) {
    message(message.SERVER.SHARED_FOLDERS_AND_FILES)
      .int32(dirs)
      .int32(files)
      .end(this.write.bind(this))
  }

  checkPrivileges() {
    message(message.SERVER.CHECK_PRIVILEGES).end(this.write.bind(this))
  }

  haveNoParents(haveParents) {
    message(message.SERVER.HAVE_NO_PARENTS)
      .bool(haveParents)
      .end(this.write.bind(this))
  }
}
