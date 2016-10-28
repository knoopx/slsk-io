import React from "react"

export default class extends React.Component {
  static displayName = "Tab"

  render() {
    return <div className="tab-view-tab" {...this.props} />
  }
}
