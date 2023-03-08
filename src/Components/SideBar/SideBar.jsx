import "./SideBar.css";
import sudukoIcon from "../../assets/images/arcticons_sudoku.png";
import sudukoIconActive from "../../assets/images/arcticons_sudoku_active.png";

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

const SideBar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar_items margin_bottom_4">
        <Link to="/path-finder">
          <Icon
            icon="material-symbols:route"
            className={`sideBar_images ${
              location.pathname === "/path-finder" && "sideBar_images_active"
            }`}
          />
        </Link>
      </div>

      <div className="sidebar_items">
        <Link to="/nqueens">
          <Icon
            icon="mdi:chess-queen"
            className={`sideBar_images ${
              location.pathname === "/nqueens" && "sideBar_images_active"
            }`}
          />
        </Link>
      </div>

      <div className="sidebar_items margin_bottom_4">
        <Link to="/sudoku-solver">
          <img
            className="sideBar_images_img"
            src={
              location.pathname === "/sudoku-solver"
                ? sudukoIconActive
                : sudukoIcon
            }
            alt="suduko"
          />
        </Link>
      </div>

      <div className="sidebar_items margin_bottom_4">
        <Link to="/tower-of-hanoi">
          <Icon
            icon="icon-park-outline:tower-of-babel"
            className={`sideBar_images ${
              location.pathname === "/tower-of-hanoi" && "sideBar_images_active"
            }`}
          />
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
