import React from 'react'

export default class extends React.Component {
  static displayName = 'List'

  render() {
    return <div className="list" {...this.props} />
  }
}
