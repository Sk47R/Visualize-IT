import React from "react";
import "./NQueen.css";
import Grid from "../../Components/NQueen/Grid/Grid";
import Slider from "@mui/material/Slider";

import { useState, useEffect } from "react";
import NQueenAlgo from "./Algorithm/NQueen";
import Navbar from "../../Components/Navbar/Navbar";

const DEFAULT_SPEED = 4;
const MIN_SPEED = 1;
const MAX_SPEED = 10;
const MIN_GRID_SIZE = 4;
const MAX_GRID_SIZE = 8;
const DEFAULT_GRID_SIZE = 4;

const NQueen = () => {
  const [grid, setGrid] = useState([]);
  const [solution, setSolution] = useState(null);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);
  const [gridSize, setGridSize] = useState(DEFAULT_GRID_SIZE);

  const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < gridSize; row++) {
      const currentRow = [];
      for (let col = 0; col < gridSize; col++) {
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
    setSolution(null);
  }, [gridSize]);

  const solveNQueen = () => {
    if (!solution) {
      const soln = NQueenAlgo(grid, gridSize, gridSize);
      setSolution(soln);
    } else {
      setGrid(solution["grid"]);
    }
  };

  const visualizeNQeen = () => {
    let animations = [];
    console.log(gridSize);
    if (!solution) {
      const soln = NQueenAlgo(grid, gridSize, gridSize);
      setSolution(soln);
      animations = soln["animation"];
    } else {
      animations = solution["animation"];
    }

    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        setGrid(animations[i]);
      }, i * speed * 15);
    }
  };

  const onSpeedChange = (e) => {
    e.target.value && setSpeed(e.target.value);
  };

  const changeGridSize = (e) => {
    console.log("hello");
    e.target.value && setGridSize(e.target.value);
  };

  const clearBoard = () => {
    const initialGrid = getInitialGrid();
    setGrid(initialGrid);
    setSolution(null);
  };

  return (
    <div className="nqueen">
      <Navbar />
      <div className="nqueen_div">
        <div className="nqueen_div_top">
          <div className="nqueen_div_top_item margin-right-2">
            <p>Animation Delay:</p>
            <Slider
              aria-label="Visualization Speed"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={MIN_SPEED}
              max={MAX_SPEED}
              value={parseInt(speed)}
              onChange={onSpeedChange}
              onBlur={onSpeedChange}
              onClick={onSpeedChange}
              sx={{
                width: "250px",
                color: "black",
              }}
            />
          </div>
          <div className="nqueen_div_top_item">
            <p>Grid Size:</p>
            <Slider
              aria-label="Visualization Speed"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={MIN_GRID_SIZE}
              max={MAX_GRID_SIZE}
              value={parseInt(gridSize)}
              onChange={changeGridSize}
              onBlur={changeGridSize}
              onClick={changeGridSize}
              sx={{
                width: "250px",
                color: "black",
              }}
            />
          </div>
        </div>

        <Grid grid={grid} gridSize={gridSize} />

        <button className="button" onClick={visualizeNQeen}>
          Visualize NQueen
        </button>
        <button className="button" onClick={solveNQueen}>
          Solve NQueen
        </button>
        <button className="button" onClick={clearBoard}>
          Clear Board
        </button>
      </div>
    </div>
  );
};

export default NQueen;
