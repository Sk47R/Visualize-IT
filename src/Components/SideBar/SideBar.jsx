import "./SideBar.css";
import sudukoIcon from "../../assets/images/arcticons_sudoku.png";
import sudukoIconActive from "../../assets/images/arcticons_sudoku_active.png";

import { Icon } from "@iconify/react";
import HomeIcon from "@mui/icons-material/Home";
import RouteIcon from "@mui/icons-material/Route";

import { Link, useLocation } from "react-router-dom";
import React from "react";

const SideBar = ({ active }) => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar_items margin_bottom_4">
        <Link to="/">
          <HomeIcon className={`sideBar_images $`} />
        </Link>
      </div>
      <div className="sidebar_items margin_bottom_4">
        <Link to="/path-finder">
          <RouteIcon
            className={`sideBar_images ${
              active == "pathFinder" && "sideBar_active"
            }`}
          />
        </Link>
      </div>

      <div className="sidebar_items">
        <Link to="/nqueens">
          <Icon
            icon="mdi:chess-queen"
            className={`sideBar_images ${
              active == "nqueen" && "sideBar_active"
            }`}
          />
        </Link>
      </div>

      <div className="sidebar_items margin_bottom_4">
        <Link to="/sudoku-solver">
          <img
            className="sideBar_images_img"
            src={`${active == "sudoku" ? sudukoIconActive : sudukoIcon} `}
            alt=""
          />
        </Link>
      </div>

      <div className="sidebar_items margin_bottom_4">
        <Link to="/tower-of-hanoi">
          <Icon
            icon="icon-park-outline:tower-of-babel"
            className={`sideBar_images ${
              active == "toh" && "sideBar_active"
            }`}
          />
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
