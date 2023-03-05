import React, { Component } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "./Node.css";
import AssistantPhotoIcon from "@mui/icons-material/AssistantPhoto";

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
    const extraClassName =
      isWall && !isStart && !isFinish ? "pathFinder-node-wall" : "";

    const startArrowClickHandler = () => {
      console.log("first");
    };

    return (
      <div
        id={`pathFinder-node-${row}-${col}`}
        className={`pathFinder-node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      >
        {isStart && (
          <KeyboardArrowRightIcon
            onClick={startArrowClickHandler}
            className="node-icon"
          />
        )}
        {isFinish && <AssistantPhotoIcon className="node-icon" />}
      </div>
    );
  }
}
