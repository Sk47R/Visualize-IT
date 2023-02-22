import { createBrowserRouter, Outlet } from "react-router-dom";

import Home from "../Pages/Home/Home";
import NQueen from "../Pages/NQueen/NQueen";
import PathFinder from "../Pages/PathFinder/PathFinder";
import SudokuSolver from "../Pages/SudokuSolver/SudokuSolver";
import TowerOfHanoi from "../Pages/TowerOfHanoi/TowerOfHanoi";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        {/* <Navbar /> */}
        <Outlet />
        {/* <Footer /> */}
      </>
    ),
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "/sudoku-solver",
        element: <SudokuSolver />,
      },
      {
        path: "/nqueens",
        element: <NQueen />,
      },
      {
        path: "/path-finder",
        element: <PathFinder />,
      },
      {
        path: "/tower-of-hanoi",
        element: <TowerOfHanoi />,
      },
    ],
  },
]);

export default router;
