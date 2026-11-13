import React from 'react';
import styles from './Panel.module.scss';

/**
 * @typedef {Object} PanelProps 
 * @property {import("react").ReactElement} header 
 * @property {import("react").ReactElement} body 
 */

/**
 * @extends {React.Component<PanelProps>}
 */
export class Panel extends React.Component {
  render() {
    return (
      <div className={styles.panel}>
        <div className={styles.panelHeader}>{this.props.header}</div>
        <div className={styles.panelBody}>{this.props.body}</div>
      </div>
    );
  }
}