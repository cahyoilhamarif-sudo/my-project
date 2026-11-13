import React from "react";
import styles from "./Checkbox.module.scss";
import clsx from "clsx";

/**
 * @typedef {Object} CheckboxProps 
 * @typedef {boolean} isChecked
 */

/**
 * @extends {React.Component<CheckboxProps>}
 */
export class Checkbox extends React.Component {
  
  render() {

    return(
    <button className={clsx(styles.checkbox, 
      this.props.isChecked && styles.checked)}
      onClick={this.props.onChange}
      disabled={this.props.isDisabled}
    />
    );
  }
}