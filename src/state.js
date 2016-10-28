var Immutable = require("immutable");
var Manager = window.require("../src/nslsk/manager");

export default {
  manager: new Manager(),
  peers: Immutable.Map(),
  tickets: Immutable.Map(),
  searches: Immutable.Map(),
  users: Immutable.List(),
  rooms: Immutable.List(),
  joinedRooms: Immutable.Map(),
  isConnected: false,
  isLoggedIn: false,
  tabs: []
};
