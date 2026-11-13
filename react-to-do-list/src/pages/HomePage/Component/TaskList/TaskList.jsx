import React from "react";
import styles from "./TaskList.module.scss";
import { TaskItem } from "./TaskItem";

/**
 * @typedef {Object} TaskListProps
 * @property {import { Task } from "@/models/Task.js";[]} tasks
 */

/**
 * @extends {React.Component<TaskListProps>}
 */
export class TaskList extends React.Component {
  
  render() {
    return(
      <ul className={styles.taskList}>
        {this.props.children}
      </ul>
    );
  }
}