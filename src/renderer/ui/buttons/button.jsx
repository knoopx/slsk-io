import React from 'react'

export default class extends React.Component {
  static displayName = 'Button';

  render() {
    return <div className="btn btn-default" {...this.props} />
  }
}
