import React, { Component } from "react";

import "./Node.css";

export default class Node extends Component {
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
    } = this.props;
    const extraClassName = isFinish
      ? "pathFinder-node-finish"
      : isStart
      ? "pathFinder-node-start"
      : isWall
      ? "pathFinder-node-wall"
      : "";

    return (
      <div
        id={`pathFinder-node-${row}-${col}`}
        className={`pathFinder-node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      ></div>
    );
  }
}
