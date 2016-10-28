import React from 'react'

export default class extends React.Component {
  static displayName = 'ListItem'

  render() {
    return <div className="list-item" {...this.props} />
  }
}
