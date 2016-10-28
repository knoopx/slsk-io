import React from "react"

const style = {
  container: {
    overflow: "auto",
    position: "relative",
    flex: 1,
  },

  inner: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
}

export default class extends React.Component {
  static displayName = "ScrollView"

  render() {
    return <div style={style.container}><div style={style.inner}>{this.props.children}</div></div>
  }
}
