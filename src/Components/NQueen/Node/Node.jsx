import React, { Component } from "react";

import "./Node.css";

export default class Node extends Component {
  render() {
    const {
      col,

      row,
      hasQueen,
      isActive,
    } = this.props;
    // const extraClassName = isFinish
    //   ? "node-finish"
    //   : isStart
    //   ? "node-start"
    //   : isWall
    //   ? "node-wall"
    //   : "";

    const white = (row + col) % 2 == 0 && "white";
    const black = (row + col) % 2 != 0 && "black";

    return (
      <div
        id={`${row}-${col}`}
        // className={`node ${extraClassName}`}
        // onMouseDown={() => onMouseDown(row, col)}
        // onMouseEnter={() => onMouseEnter(row, col)}
        // onMouseUp={() => onMouseUp()}
        className={`node ${isActive && "red"} ${
          isActive && hasQueen && "green"
        } ${black} ${white}`}
      >
        {hasQueen && (
          <img
            className="node-image"
            src="https://cdn.pixabay.com/photo/2013/07/12/16/57/chess-151548_1280.png"
          ></img>
        )}
      </div>
    );
  }
}
