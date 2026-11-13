import React from "react";
import styles from "./TodoPage.module.scss";

export class TodoHeader extends React.Component {
  render() {
    return(
      <div className={styles.header}>{this.props.children}</div>
    );
  }
}