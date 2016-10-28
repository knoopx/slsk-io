import React from 'react'
import classNames from 'classnames'

export default class extends React.Component {
  static displayName = 'TabSet'

  state = window.previousTabSetState || {
    activeIndex: -1
  }

  componentDidMount() {
    return typeof module.onReload === 'function' ? module.onReload(() => {
      return window.previousTabSetState = this.state
    }) : void 0
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.activeIndex === -1 && nextProps.children.length > 0) {
      return this.setActiveIndex(0)
    }
  }

  setActiveIndex = (index) => {
    return this.setState({
      activeIndex: index
    })
  }

  render() {
    return (<div className="tab-view">
      <div className="tab-view-tab-set">
        { React.Children.map(this.props.children, this.renderTab) }
      </div>
      { this.props.children[this.state.activeIndex] }
    </div>)
  }

  renderTab = (tab, index) => {
    return (<a key={index} onClick={() => {
      return this.setActiveIndex(index)
    }} className={classNames(
                                                                                                                                               'tab-view-tab-set-tab',
      {
        active: this.state.activeIndex === index
      },
                                                                                                                                             )}
    >
      { tab.props.title }
    </a>)
  }
}
