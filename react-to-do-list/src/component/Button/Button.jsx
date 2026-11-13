import React from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

export class Button extends React.Component {

  render() {
    const { className, ...props } = this.props;
    
    return(
      <button 
        className={clsx(styles.button, className)}
        {...props}
      >
        {this.props.children}
      </button>
    );
  }
}