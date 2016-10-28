import React from 'react'

export default class Button extends React.Component {
  render() {
    return <div className="btn btn-default" {...this.props} />
  }
}
