import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div>
        <Link to="sudoku-solver">Suduko Solver</Link>
      </div>

      <div>
        <Link to="nqueens">NQueens</Link>
      </div>

      <div>
        <Link to="path-finder">Path Finder</Link>
      </div>

      <div>
        <Link to="tower-of-hanoi">Tower of Hanoi</Link>
      </div>
    </div>
  );
};

export default Home;
