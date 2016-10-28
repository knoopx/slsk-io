import React from 'react'

export default class extends React.Component {
  static displayName = 'Gutter';

  static defaultProps = {
    size: 10
  };

  state = {
    size: this.props.size
  };

  getStyle = () => {
    return {
      width: `${this.state.size}px`,
      display: 'inline-block'
    }
  };

  render() {
    return <div className="gutter" style={this.getStyle()} />
  }
}
