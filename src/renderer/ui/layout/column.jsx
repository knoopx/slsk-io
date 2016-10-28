import React from 'react'

export default class extends React.Component {
  static displayName = 'Column';

  static defaultProps = {
    display: 'flex',
    flex: 12
  };

  getStyle = () => {
    return {
      display: this.props.display,
      flex: this.props.flex,
      flexDirection: 'column',
      flexWrap: 'nowrap',
      overflow: this.props.overflow,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      padding: this.props.padding,
      alignItems: this.props.alignItems,
      alignSelf: this.props.alignSelf,
      minWidth: 0
    }
  };

  render() {
    return (<div className="column" {...this.props} style={Object.merge(this.getStyle(), this.props.style)} />)
  }
}
