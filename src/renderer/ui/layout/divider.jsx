import React from 'react'

export default class extends React.Component {
  static displayName = 'Divider';

  getStyle = () => {
    if ('vertical' in this.props) {
      return {
        borderRight: '1px solid #ccc',
        flexBasis: '0'
      }
    } else {
      return {
        borderBottom: '1px solid #ccc',
        flexBasis: '0'
      }
    }
  };

  render() {
    return <div className="divider" style={this.getStyle()} />
  }
}
