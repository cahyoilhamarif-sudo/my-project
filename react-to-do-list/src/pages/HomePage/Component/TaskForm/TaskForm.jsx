import React from 'react';
import styles from './TaskForm.module.scss';
import { Button } from '@/component/Button/Button.jsx';
import iconPen from '@/assets/images/icon-pen-line.svg';
import iconPlus from '@/assets/images/icon-plus.svg';

/**
 * @typedef {Object} TaskFromProps
 * @property {String} value
 * @property {boolean} isDisabled
 * @property {(value: string) => void} onChangeValue
 * @property {() => void} onAdd
 */

/**
 * @extends {React.Component<TaskFromProps>}
 */
export class TaskForm extends React.Component {

/**
 * 
 * @param {React.ChangeEvent<HTMLInputElement>} event 
 */
  handleChange = (event) => {
    this.props.onChangeValue(event.currentTarget.value);
  }

  render() {
    return(
      <div className={styles.taskInput}>
        <div className={styles.taskForm}>
          <span className={styles.taskFormIcon}>
            <img src={iconPen} alt="icon pen line" />
          </span>
          <input 
            type="text"
            value={this.props.value}
            className={styles.taskFormField} 
            placeholder='Add a new Task...'
            onChange={this.handleChange}
            disabled={this.props.isDisabled}
          />
        </div>
        <Button onClick={this.props.onAdd} disabled={this.props.isDisabled}>
          <img src={iconPlus} alt='icon plus'/>
          Add
        </Button>
      </div>
    );
  }
}