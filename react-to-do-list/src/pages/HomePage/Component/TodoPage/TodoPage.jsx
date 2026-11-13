import React from "react";
import styles from "./TodoPage.module.scss";

export class TodoPage extends React.Component {
  render() {
    return(
      <div className={styles.todoPage}>{this.props.children}</div>
    );
  }
}