import React, { Component } from "react";
import "./Node.css";
import queen from "../../../assets/images/queen.png";

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
        className={`node ${isActive && "queenNode_active"} ${
          isActive && hasQueen && "queenNode_hasQueen"
        } ${black} ${white}`}
        style={{ width: `${nodeSize}rem`, height: `${nodeSize}rem` }}
      >
        {hasQueen && (
          <img
            style={{
              width: `${queenImageSize}rem`,
              height: `${queenImageSize}rem - 0rem`,
            }}
            src={queen}
          ></img>
        )}
      </div>
    );
  }
}
