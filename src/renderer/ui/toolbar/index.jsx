import React from 'react'
import { Row } from '../layout'

export default class Toolbar extends React.Component {
  render() {
    return <Row className="toolbar" {...this.props} />
  }
}
