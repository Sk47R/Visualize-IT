import React from "react";
import Node from "../Node/Node";
import "./Grid.css";

const Grid = ({ grid, gridSize }) => {
  console.log("rendered");
  return (
    <div className="grid">
      {grid.map((row, rowIdx) => {
        return (
          <div key={rowIdx} className="grid-row">
            {row.map((node, nodeIdx) => {
              const { row, col } = node;

              return (
                <Node
                  key={nodeIdx}
                  col={col}
                  row={row}
                  hasQueen={node.hasQueen}
                  isActive={node.isActive}
                  gridSize={gridSize}
                ></Node>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
