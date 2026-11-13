import React from 'react';
import styles from './StatGrid.module.scss';

export class StatGrid extends React.Component {
  render(){
    return (
      <div className={styles.statGrid}>
        {this.props.children}
      </div>
    );
  }
}
