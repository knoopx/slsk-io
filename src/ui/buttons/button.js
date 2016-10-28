var React = require("react");

export default React.createClass({
  displayName: "Button",
  mixins: [require('react-addons-pure-render-mixin')],
  render: function() {
    return React.createElement("div", Object.assign({
      "className": "btn btn-default"
    }, this.props));
  }
});
