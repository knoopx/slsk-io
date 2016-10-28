import React from "react";

export default React.createClass({
  displayName: "Button",
  mixins: [require('react-addons-pure-render-mixin')],

  render() {
    return <div className="btn btn-default" {...this.props} />;
  },
});
