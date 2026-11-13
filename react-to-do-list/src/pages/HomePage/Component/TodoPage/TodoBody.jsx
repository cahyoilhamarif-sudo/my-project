import React from "react";
import styles from "./TodoPage.module.scss";

export class TodoBody extends React.Component {
  render() {
    return(
      <div className={styles.body}>{this.props.children}</div>
    );
  }
}