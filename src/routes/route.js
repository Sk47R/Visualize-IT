import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "../Pages/Home/Home";
import NQueen from "../Pages/NQueen/NQueen";
import PathFinder from "../Pages/PathFinder/PathFinder";
import SudukoSolver from "../Pages/SudukoSolver/SudukoSolver";

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
        path: "/suduko-solver",
        element: <SudukoSolver />,
      },
      {
        path: "/nqueens",
        element: <NQueen />,
      },
      {
        path: "/path-finder",
        element: <PathFinder />,
      },
    ],
  },

  //   //for login
  //   {
  //     path: "login",
  //     element: <Login />,
  //   },
  //   //for signup
  //   {
  //     path: "signup",
  //     element: <SignUp />,
  //   },
]);

export default router;
