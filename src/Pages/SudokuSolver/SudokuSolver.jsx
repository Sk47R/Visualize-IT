import "./SudokuSolver.css";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import SideBar from "../../Components/SideBar/SideBar";

import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

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
  const [visualizeSpeed] = useState(500);

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
              steps.push(grid.map((arr) => arr.slice()));

              const newGrid = grid.slice();
              newGrid[row][col] = n;
              setGrid(newGrid);

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
    <div className="sudukuSolver">
      <div className="sudukuSolver_left">
        <SideBar />
      </div>
      <div className="sudukuSolver_right">
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
      </div>
    </div>
  );

  //   return (
  //     <Grid
  //       container
  //       spacing={2}
  //       align="center"
  //       alignItems="center"
  //       justifyContent="center"
  //       minHeight="100vh"
  //     >
  //       <Card
  //         sx={{
  //           p: 3,
  //           boxShadow: 3,
  //           borderRadius: 1,
  //           width: "fit-content",
  //         }}
  //       >
  //         <Grid item>
  //           <Typography
  //             variant="h5"
  //             sx={{
  //               marginBottom: ".5rem",
  //               color: "white",
  //               backgroundColor: "black",
  //               padding: "1rem",
  //               borderRadius: "1rem",
  //               width: "fit-content",
  //             }}
  //           >
  //             Sudoku Solver
  //           </Typography>
  //         </Grid>

  //         <Grid item gap={2} xs={12} justifyContent="center" marginTop="0.75rem">
  //           <Button
  //             variant="contained"
  //             disabled={visualize}
  //             sx={{
  //               color: "white",
  //               backgroundColor: "#101010",
  //               marginRight: "1rem",

  //               ":hover": {
  //                 backgroundColor: "#101010",
  //               },
  //             }}
  //             onClick={() => {
  //               if (!isValidSudoku()) return alert("Invalid Sudoku");
  //               solve();
  //             }}
  //           >
  //             Solve
  //           </Button>
  //           <Button
  //             variant="contained"
  //             disabled={visualize}
  //             sx={{
  //               color: "white",
  //               backgroundColor: "#101010",
  //               marginRight: "1rem",

  //               ":hover": {
  //                 backgroundColor: "#101010",
  //               },
  //             }}
  //             onClick={() => {
  //               if (!isValidSudoku()) return alert("Invalid Sudoku");

  //               setVisualize(true);
  //               solve();
  //               visualizeSolve();
  //             }}
  //           >
  //             Visualize
  //           </Button>
  //           <Button
  //             variant="contained"
  //             sx={{
  //               color: "white",
  //               backgroundColor: "#101010",

  //               ":hover": {
  //                 backgroundColor: "#101010",
  //               },
  //             }}
  //             onClick={() => navigate(0)}
  //           >
  //             Reset
  //           </Button>
  //         </Grid>
  //       </Card>
  //     </Grid>
  //   );
}

export default SudokuSolver;
