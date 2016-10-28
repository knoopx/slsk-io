var React = require("react");

export default React.createClass({
  displayName: "Divider",
  mixins: [require('react-addons-pure-render-mixin')],
  getStyle: function() {
    if ("vertical" in this.props) {
      return {
        borderRight: "1px solid #ccc",
        flexBasis: "0"
      };
    } else {
      return {
        borderBottom: "1px solid #ccc",
        flexBasis: "0"
      };
    }
  },
  render: function() {
    return React.createElement("div", {
      "className": "divider",
      "style": this.getStyle()
    });
  }
});
