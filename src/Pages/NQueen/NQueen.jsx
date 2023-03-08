import React from "react";
import "./NQueen.css";
import Grid from "../../Components/NQueen/Grid/Grid";
import Slider from "@mui/material/Slider";

import { useState, useEffect } from "react";
import NQueenAlgo from "./Algorithm/NQueen";
import SideBar from "../../Components/SideBar/SideBar";
import slowTurtle from "../../assets/images/mdi_tortoise.png";
import slowestTurtle from "../../assets/images/fluent_animal-turtle-24-filled.png";
import slowRabbit from "../../assets/images/fluent_animal-rabbit-20-filled.png";
import fastRabbit from "../../assets/images/mdi_rabbit.png";

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
      <div className="nqueen_left">
        <SideBar />
      </div>
      <div className="nqueen_right">
        <div className="nqueen_div_top">
          <div className="nqueen_div_top_left">
            <span className="nqueen_div_top_left_header">
              NQueen's Visualization
            </span>
          </div>
          <div className="nqueen_div_top_right">
            <div className="nqueen_div_top_right_item margin_right_2">
              <button
                className="nqueen_div_top_right_item_button fill_button"
                onClick={visualizeNQeen}
              >
                Visualize
              </button>
            </div>
            <div className="nqueen_div_top_right_item margin_right_2">
              <button
                className="nqueen_div_top_right_item_button fill_button"
                onClick={solveNQueen}
              >
                Solve
              </button>
            </div>
            <div className="nqueen_div_top_right_item">
              <button
                className="nqueen_div_top_right_item_button"
                onClick={clearBoard}
              >
                Clear Board
              </button>
            </div>
          </div>
        </div>

        <div className="nqueen_right_body">
          <div className="nqueen_right_body_left">
            <div className="nqueen_right_body_left_grid_left">
              <Grid grid={grid} gridSize={gridSize} />
              <div className="nqueen_right_body_left_grid_right">
                <div
                  className="nqueen_right_body_left_grid_right_item-1"
                  onClick={() => {
                    setGridSize(8);
                  }}
                ></div>
                <div
                  className="nqueen_right_body_left_grid_right_item-2"
                  onClick={() => {
                    setGridSize(7);
                  }}
                ></div>
                <div
                  className="nqueen_right_body_left_grid_right_item-3"
                  onClick={() => {
                    setGridSize(6);
                  }}
                ></div>
                <div
                  className="nqueen_right_body_left_grid_right_item-4"
                  onClick={() => {
                    setGridSize(5);
                  }}
                ></div>
                <div
                  className="nqueen_right_body_left_grid_right_item-5"
                  onClick={() => {
                    setGridSize(4);
                  }}
                ></div>
              </div>
            </div>
            <div className="nqueen_right_body_left_bottom">
              <div className="pathFinder_bottom_item">
                <img
                  className={`pathFinder_bottom_item_speedIcon ${
                    speed == 4 && "pathFinder_bottom_item_speedIcon_active"
                  }`}
                  src={slowestTurtle}
                  alt=""
                  onClick={() => {
                    setSpeed(4);
                  }}
                />
              </div>
              <div className="pathFinder_bottom_item">
                <img
                  className={`pathFinder_bottom_item_speedIcon ${
                    speed == 3 && "pathFinder_bottom_item_speedIcon_active"
                  }`}
                  src={slowTurtle}
                  alt=""
                  onClick={() => {
                    setSpeed(3);
                  }}
                />
              </div>
              <div className="pathFinder_bottom_item">
                <img
                  className={`pathFinder_bottom_item_speedIcon ${
                    speed == 1.5 && "pathFinder_bottom_item_speedIcon_active"
                  }`}
                  src={slowRabbit}
                  onClick={() => {
                    setSpeed(1.5);
                  }}
                  alt=""
                />
              </div>
              <div className="pathFinder_bottom_item">
                <img
                  className={`pathFinder_bottom_item_speedIcon ${
                    speed == 1 && "pathFinder_bottom_item_speedIcon_active"
                  }`}
                  src={fastRabbit}
                  alt=""
                  onClick={() => {
                    setSpeed(1);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="nqueen_right_body_right">
            <div className="nqueen_right_body_right_top">
              <span className="nqueen_right_body_right__top_header">
                DESCRIPTION
              </span>
            </div>
            <div className="nqueen_right_body_right_bottom">
              <p className="nqueen_right_body_right_bottom_para">
                The N-Queens problem is a classic puzzle that involves placing N
                chess queens on an N×N chessboard such that no two queens
                threaten each other. This means that no two queens can be placed
                on the same row, column, or diagonal. For example, in the case
                of the 8-Queens problem, we need to place 8 queens on an 8x8
                chessboard in such a way that no two queens share the same row,
                column, or diagonal. The N-Queens problem is a well-known
                problem in computer science, and has been studied extensively as
                an example of a problem that can be solved using backtracking
                algorithms. Backtracking algorithms are a type of algorithm that
                can be used to solve problems where the solution involves making
                a series of choices or decisions, each of which can lead to
                several possible outcomes. The N-Queens problem is a challenging
                problem, especially for larger values of N. However, there are
                several algorithms that can be used to solve this problem
                efficiently, including backtracking algorithms, genetic
                algorithms, and others.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NQueen;
