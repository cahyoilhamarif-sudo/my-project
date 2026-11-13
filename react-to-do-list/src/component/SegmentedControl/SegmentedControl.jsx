import React from "react";
import styles from "./SegmentedControl.module.scss";
import clsx from "clsx";

/**
 * @typedef {Object} SegmentedControlProp 
 * @property {string[]} segments
 * @property {number} selectedStatus
 * @property {boolean} isDisabled
 * @property {(index: number) => void} onSelectSegment 
 */

/**
 * @extends React.Component<SegmentedControlProp>
 */
export class SegmentedControl extends React.Component {

  constructor(props) {
    super(props);
    this.handleClickSegment = this.handleClickSegment.bind(this);
  }
/**
 * 
 * @param {React.MouseEvent<HTMLButtonElement>} event 
 */
  handleClickSegment(event) {
    const index = Number(event.currentTarget.dataset.index);
    this.props.onSelectSegment(index)
  }

  render() {
    return(
      <div className={styles.segmentedControl}>
        {this.props.segments.map((segment, index)=>( 
        <button 
          className={clsx(styles.segment, this.props.selectedStatus === index && styles.selected,)}
          key={index} 
          data-index={index}
          selected={index === this.props.selectedStatus} 
          onClick={this.handleClickSegment}
          disabled={this.props.isDisabled}
        >
          {segment}
        </button>))}
      </div>
    ); 
  }
}