import React from 'react'
import classNames from 'classnames'

import styles from './tab-set.less'
import tabStyles from './tab.less'

export default class TabSet extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.tabSet}>
          { React.Children.map(this.props.children, this.renderTab) }
        </div>
        { this.props.children[this.state.activeIndex] }
      </div>
    )
  }

  renderTab = (tab, index) => {
    return (
      <a key={index} onClick={() => { this.setActiveIndex(index) }} className={classNames('tabSet', { active: this.state.activeIndex === index })}>
        { tab.props.title }
      </a>
    )
  }
}
