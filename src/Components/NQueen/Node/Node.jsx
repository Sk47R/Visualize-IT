import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  render() {
    const { col, row, hasQueen, isActive, gridSize } = this.props;

    const white = (row + col) % 2 == 0 && "white";
    const black = (row + col) % 2 != 0 && "black";
    let nodeSize = 48 / gridSize;
    let queenImageSize = 48 / gridSize - 2.5;

    return (
      <div
        id={`${row}-${col}`}
        className={`node ${isActive && "red"} ${
          isActive && hasQueen && "green"
        } ${black} ${white}`}
        style={{ width: `${nodeSize}rem`, height: `${nodeSize}rem` }}
      >
        {hasQueen && (
          <img
            style={{
              width: `${queenImageSize}rem`,
              height: `${queenImageSize}rem`,
            }}
            src="https://cdn.pixabay.com/photo/2013/07/12/16/57/chess-151548_1280.png"
          ></img>
        )}
      </div>
    );
  }
}
