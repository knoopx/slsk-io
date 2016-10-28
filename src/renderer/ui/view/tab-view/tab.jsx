import React from 'react'
import styles from './tab.less'

export default class Tab extends React.Component {
  render() {
    return <div className={styles.default} {...this.props} />
  }
}
