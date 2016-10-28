import React from "react"

export default React.createClass({
  displayName: "Gutter",
  mixins: [require('react-addons-pure-render-mixin')],

  getDefaultProps() {
    return {
      size: 10,
    }
  },

  getInitialState() {
    return {
      size: this.props.size,
    }
  },

  getStyle() {
    return {
      width: `${this.state.size}px`,
      display: "inline-block",
    }
  },

  render() {
    return <div className="gutter" style={this.getStyle()} />
  },
})
