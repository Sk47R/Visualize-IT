import React from "react";
import Node from "../../Components/NQueen/Node/Node";
import "./NQueen.css";
import Grid from "../../Components/NQueen/Grid/Grid";
import { useState, useEffect } from "react";
import NQueenAlgo from "./Algorithm/NQueen";
const rows = 6;
const cols = 6;

const NQueen = () => {
  const [grid, setGrid] = useState([]);
  const [solution, setSolution] = useState(null);

  const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < rows; row++) {
      const currentRow = [];
      for (let col = 0; col < cols; col++) {
        currentRow.push(createNode(row, col));
      }
      grid.push(currentRow);
    }
    return grid;
  };

  const createNode = (row, col) => {
    return {
      col, //j
      row, //i
      hasQueen: false,
      isActive: false,
      id: `${row}-${col}`,
    };
  };

  useEffect(() => {
    const initialGrid = getInitialGrid();
    setGrid(initialGrid);
  }, []);

  const solveNQueen = () => {
    let results = [];
    if (!solution) {
      const soln = NQueenAlgo(grid, rows, cols);
      setSolution(soln);
      results = soln["grid"];
    } else {
      results = solution["grid"];
      setGrid(solution["grid"]);
    }
  };

  const visualizeNQeen = () => {
    let animations = [];
    if (!solution) {
      const soln = NQueenAlgo(grid, rows, cols);
      setSolution(soln);
      animations = soln["animation"];
    } else {
      animations = solution["animation"];
    }

    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        setGrid(animations[i]);
      }, i * 100);
    }
  };

  return (
    <div className="nqueen">
      <Grid grid={grid} />
      <button className="button" onClick={visualizeNQeen}>
        Visualize NQueen
      </button>
    </div>
  );
};

export default NQueen;
