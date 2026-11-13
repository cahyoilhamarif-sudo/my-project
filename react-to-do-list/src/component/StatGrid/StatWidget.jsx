import React from 'react';
import styles from './StatGrid.module.scss'
import clsx from 'clsx';

const StatWidgetColor = Object.freeze({
  
})
/**
 * @typedef {Object} StatWidgetProps
 * @typedef {React.ElementType} icon
 * @property {React.ElementType} alt
 * @property {string} label
 * @property {string} value
 * @property {string} className
 */

/**
 * @extends {React.Component<StatWidgetProps>}
 */
export class StatWidget extends React.Component {
  render() {

    return(
      <div className={clsx(styles.statWidget, this.props.classWidget)}>
        <div className={styles.statWidgetIcon}>
          <img className={styles.statWidgetBody} src={this.props.icon} alt={this.props.alt} />
          <div className={styles.statWidgetBody}>
            <div className={styles.statWidgetLabel}>{this.props.children}</div>
            <div className={styles.statWidgetValue}>{this.props.value}</div>
          </div>
        </div>
      </div>
    );
  }
}