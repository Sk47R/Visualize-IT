import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div>
        <Link to="suduko-solver">Suduko Solver</Link>
      </div>
      <div>
        <Link to="nqueens">NQueens</Link>
      </div>
      <div>
        <Link to="path-finder">Path Finder</Link>
      </div>
    </div>
  );
};

export default Home;
