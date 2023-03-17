import "./SudokuSolver.css";

import slowTurtle from "../../assets/images/mdi_tortoise.png";
import slowestTurtle from "../../assets/images/fluent_animal-turtle-24-filled.png";
import slowRabbit from "../../assets/images/fluent_animal-rabbit-20-filled.png";
import fastRabbit from "../../assets/images/mdi_rabbit.png";

import Grid from "@mui/material/Grid";
import SideBar from "../../Components/SideBar/SideBar";

import { makepuzzle } from "sudoku";

import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const DEFAULT_SPEED = 4;

function SudokuSolver() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sudoku Solver";
  }, []);

  const [grid, setGrid] = useState(
    Array(9)
      .fill()
      .map(() => Array(9).fill(""))
  );

  const [steps] = useState([]);
  const [visualize, setVisualize] = useState(false);
  const [visualizeSpeed, setVisualizeSpeed] = useState(DEFAULT_SPEED);

  const generateSudoku = () => {
    const puzzle = makepuzzle();

    const newGrid = grid.slice();
    for (const [i, val] of puzzle.entries()) {
      newGrid[i % 9][parseInt(i / 9)] = val ? val : "";
    }

    setGrid(newGrid);
  };

  const possible = (row, col, n) => {
    for (let i = 0; i < 9; i++) {
      /* Row check */
      if (grid[row][i] === n) return false;

      /* Column check */
      if (grid[i][col] === n) return false;

      /* 3x3 box check */
      if (
        grid[parseInt(row / 3) * 3 + parseInt(i / 3)][
          parseInt(col / 3) * 3 + (i % 3)
        ] === n
      ) {
        return false;
      }
    }

    return true;
  };

  const isValidSudoku = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] !== "") {
          const n = grid[row][col];
          grid[row][col] = "";

          if (!possible(row, col, n)) {
            grid[row][col] = n;
            return false;
          }

          grid[row][col] = n;
        }
      }
    }

    return true;
  };

  const solve = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === "") {
          for (let n = 1; n < 10; n++) {
            if (possible(row, col, n)) {
              const newGrid = grid.slice();
              newGrid[row][col] = n;
              setGrid(newGrid);

              steps.push(grid.map((arr) => arr.slice()));

              if (solve()) return true;

              /* If the number doesn't work, reset the cell for backtracking */
              newGrid[row][col] = "";
              setGrid(newGrid);
            }
          }

          /* The number(s) don't fit so backtracking is required */
          return false;
        }
      }
    }
    return true;
  };

  const visualizeSolve = async () => {
    for (let step of steps) {
      setGrid(step);
      await new Promise((resolve) => {
        setTimeout(resolve, visualizeSpeed);
      });
    }
  };

  return (
    <div className="sudokuSolver">
      <div className="sudokuSolver_left">
        <SideBar active="sudoku" />
      </div>
      <div className="sudokuSolver_right">
        <div className="sudokuSolver_right_top">
          <div className="sudokuSolver_right_top_left">
            <span className="sudokuSolver_right_top_left_header">
              Sudoku Solver
            </span>
          </div>

          <div className="sudokuSolver_right_top_right">
            <div className="sudokuSolver_right_top_right_item margin_right_2">
              <button
                className="sudokuSolver_right_top_right_item_button fill_button"
                disabled={visualize}
                onClick={generateSudoku}
              >
                Generate
              </button>
            </div>

            <div className="sudokuSolver_right_top_right_item margin_right_2">
              <button
                className="sudokuSolver_right_top_right_item_button fill_button"
                disabled={visualize}
                onClick={() => {
                  if (!isValidSudoku()) return alert("Invalid Sudoku");

                  setVisualize(true);
                  solve();
                  visualizeSolve();
                  setVisualize(false);
                }}
              >
                Visualize
              </button>
            </div>

            <div className="sudokuSolver_right_top_right_item margin_right_2">
              <button
                className="sudokuSolver_right_top_right_item_button fill_button"
                disabled={visualize}
                onClick={() => {
                  if (!isValidSudoku()) return alert("Invalid Sudoku");
                  solve();
                }}
              >
                Solve
              </button>
            </div>
            <div className="sudokuSolver_right_top_right_item">
              <button
                className="sudokuSolver_right_top_right_item_button"
                onClick={() => navigate(0)}
              >
                Clear Grid
              </button>
            </div>
          </div>
        </div>

        <div className="sudokuSolver_right_body">
          <div className="sudokuSolver_right_body_left">
            {grid.map((row, i) => (
              <Grid item key={i} className="row" width="fit-content">
                {row.map((cell, j) => (
                  <input
                    className="number-input"
                    key={j}
                    value={cell}
                    type="number"
                    disabled={visualize}
                    onChange={(e) => {
                      if (e.target.value === "") {
                        const newGrid = grid.slice();
                        newGrid[i][j] = "";
                        return setGrid(newGrid);
                      }

                      const num = parseInt(e.target.value);
                      if (num < 1 || num > 9) return;

                      const newGrid = grid.slice();
                      newGrid[i][j] = num;
                      setGrid(newGrid);
                    }}
                  />
                ))}
              </Grid>
            ))}

            <div className="nqueen_right_body_left_bottom">
              <div className="pathFinder_bottom_item">
                <img
                  className={`pathFinder_bottom_item_speedIcon ${
                    visualizeSpeed === 4 &&
                    "pathFinder_bottom_item_speedIcon_active"
                  }`}
                  src={slowestTurtle}
                  alt=""
                  onClick={() => {
                    setVisualizeSpeed(4);
                  }}
                />
              </div>
              <div className="pathFinder_bottom_item">
                <img
                  className={`pathFinder_bottom_item_speedIcon ${
                    visualizeSpeed === 3 &&
                    "pathFinder_bottom_item_speedIcon_active"
                  }`}
                  src={slowTurtle}
                  alt=""
                  onClick={() => {
                    setVisualizeSpeed(3);
                  }}
                />
              </div>
              <div className="pathFinder_bottom_item">
                <img
                  className={`pathFinder_bottom_item_speedIcon ${
                    visualizeSpeed === 1.5 &&
                    "pathFinder_bottom_item_speedIcon_active"
                  }`}
                  src={slowRabbit}
                  onClick={() => {
                    setVisualizeSpeed(1.5);
                  }}
                  alt=""
                />
              </div>
              <div className="pathFinder_bottom_item">
                <img
                  className={`pathFinder_bottom_item_speedIcon ${
                    visualizeSpeed === 1 &&
                    "pathFinder_bottom_item_speedIcon_active"
                  }`}
                  src={fastRabbit}
                  alt=""
                  onClick={() => {
                    setVisualizeSpeed(1);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="sudokuSolver_right_body_right">
            <div className="nqueen_right_body_right_top">
              <span className="nqueen_right_body_right__top_header">
                DESCRIPTION
              </span>
            </div>
            <div className="nqueen_right_body_right_bottom">
              <p className="nqueen_right_body_right_bottom_para">
                A Sudoku solver is a program or algorithm that solves Sudoku
                puzzles, which are logic-based number-placement games. The goal
                of Sudoku is to fill a 9x9 grid with digits so that each column,
                each row, and each of the nine 3x3 subgrids contains all of the
                digits from 1 to 9 without any duplicates. A Sudoku solver uses
                various techniques to fill in the grid, such as scanning the
                rows and columns to eliminate possibilities, using logical
                deductions to narrow down the possible values in each cell, and
                trying out different possibilities and backtracking when
                necessary. There are many different algorithms and techniques
                that can be used to solve Sudoku puzzles, ranging from simple
                brute-force methods to more complex strategies that involve
                advanced logic and reasoning. Some Sudoku solvers are designed
                to be highly efficient and can solve even the most difficult
                puzzles in a matter of seconds, while others may take longer or
                require more computational resources.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SudokuSolver;
