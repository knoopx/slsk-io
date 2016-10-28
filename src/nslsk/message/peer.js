
/**
 * TODO:
 *
 * 16	Info Reply
 * 36	Folder Contents Request
 * 37	Folder Contents Reply
 * 40  	Transfer Request
 * 41	Upload Reply
 * 41	Download Reply
 * 41	Transfer Reply
 * 42	Upload Placehold
 * 43	Queue Download
 * 44	Upload Queue Notification
 * 46	Upload Failed
 * 50	Queue Failed
 * 51	Place In Queue Request
 * 52	Upload Queue Notification
 */

const code = module.exports = {}

/**
 * 0 - Pierce firewall.
 */

const PIERCE_FIREWALL = code.PIERCE_FIREWALL = 0
code[PIERCE_FIREWALL] = { name: 'pierce firewall' }
code[PIERCE_FIREWALL].decode = function(message) {
  return {
    // token: message.uint32()
  }
}

/**
 * 1 - Peer init.
 */

const PEER_INIT = code.PEER_INIT = 1
code[PEER_INIT] = { name: 'peer init' }
code[PEER_INIT].decode = function(message) {
  return {
    // user: message.string(),
    // type: message.string(),
    // token: message.uint32()
  }
}

/**
 * 4 - Shares request.
 */

const SHARES_REQUEST = code.SHARES_REQUEST = 4
code[SHARES_REQUEST] = { name: 'shares request' }
code[SHARES_REQUEST].decode = function(message) {
  return {};  // empty message.
}

/**
 * 5 - Shares reply.
 */

const SHARES_REPLY = code.SHARES_REPLY = 5
code[SHARES_REPLY] = { name: 'shares reply' }
code[SHARES_REPLY].decode = function(message, callback) {
  message.decompress((err, message) => {
    const dirs = message.int32()
    callback.call(message, err, {
      // TODO:
    })
  })
}

/**
 * 8 - Search request.
 */

const SEARCH_REQUEST = code.SEARCH_REQUEST = 8
code[SEARCH_REQUEST] = { name: 'search request' }
code[SEARCH_REQUEST].decode = function(message) {
  return {
    ticket: message.int32(),
    query: message.string(),
  }
}

/**
 * 9 - Search reply.
 */

const SEARCH_REPLY = code.SEARCH_REPLY = 9
code[SEARCH_REPLY] = { name: 'search reply' }
code[SEARCH_REPLY].decode = function(message, callback) {
  message.decompress((err, message) => {
    const user = message.string()
    const ticket = message.int32()
    const count = message.int32()
    const results = []

    for (let i = 0; i < count; ++i) {
      message.uchar(); // forward cursor. (what?)

      results[i] = {
        filename: message.string(),
        size: message.int64(),
        ext: message.string(),
        attributes: [],
      }

      const attrCount = message.int32()
      for (let j = 0; j < attrCount; ++j) {
        results[i].attributes[j] = {
          place: message.int32(),
          attribute: message.int32(),
        }
      }
    }

    callback.call(
      message,
      err,
      {
        user,
        ticket,
        results,
        slotfree: message.uchar(),
        avgspeed: message.int32(),
        queueLength: message.int64(),
      },
    )
  })
}

/**
 * 15 - Info request.
 */

const INFO_REQUEST = code.INFO_REQUEST = 15
code[INFO_REQUEST] = { name: 'info request' }
code[INFO_REQUEST].decode = function(message) {
  // TODO:
  return {}
}
