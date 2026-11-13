import React, { useState } from "react";
import { Checkbox } from "@/component/Checkbox/Checkbox";
import styles from "./TaskItem.module.scss";
import clsx from "clsx";

/**
 * @typedef {Object} TaskItemProps 
 * @property {number} data-id
 * @property {string} label 
 * @property {boolean} isCompleted
 * @property {boolean} isEditing
 * @property {boolean} isDisabled
 * @property {() => void} onChangeCheckbox
 * @property {(value: string) => void} onChangeLabel
 * @property {() => void} onEditing
 * @property {()=> void} onDelete
 */

/**
 * @extends {React.Component<TaskItemProps>}
 */
export class TaskItem extends React.Component {

  state = { label: this.props.label }
  /**
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} event 
   */
  handleOnChangeLabel = (event) => {
    this.setState({ label: event.currentTarget.value })
  };

  handleConfirm = () => {
    this.props.onChangeLabel(this.state.label);
    this.props.onEditing();
  };

  handleCancel = () => {
    this.setState({ label: this.props.label });
    this.props.onEditing();
  };

  render() {
    return(
      <li 
        className={clsx(styles.taskItem, 
        this.props.isEditing && styles.editing, 
        this.props.isCompleted && styles.completed)}
      >
        <Checkbox 
          isChecked={this.props.isCompleted}
          onChange={this.props.onChangeCheckbox}
          isDisabled={this.props.isDisabled}
        />
        <span className={styles.content}>
          <span className={styles.label}>{this.props.label}</span>
          <span className={styles.actions}>
            <span 
              className={clsx(styles.action, styles.edit)}
              onClick={this.props.onEditing}
            />
            <span 
              className={clsx(styles.action, styles.delete)}
              onClick={this.props.onDelete}  
            />
          </span>
        </span>
        <div className={styles.form}>
          <input 
            type="text" 
            className={styles.formInput} 
            value={this.state.label}
            onChange={this.handleOnChangeLabel}
          />
          <span className={styles.actionsInput}>
            <span 
              className={clsx(styles.action, styles.confirm)}
              onClick={this.handleConfirm}
            />
            <span 
              className={clsx(styles.action, styles.cancel)}
              onClick={this.handleCancel}
            />
          </span>
        </div>
      </li>
    );
  }
}