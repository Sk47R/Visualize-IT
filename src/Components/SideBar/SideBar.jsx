import React from "react";
import "./SideBar.css";
import RouteIcon from "@mui/icons-material/Route";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import sudukoIcon from "../../assets/images/arcticons_sudoku.png";
import HomeIcon from "@mui/icons-material/Home";
import sudukoIconActive from "../../assets/images/arcticons_sudoku_active.png";
import toh from "../../assets/images/toh-active.png";
import tohNormal from "../../assets/images/toh-normal.png";

const SideBar = ({ active }) => {
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
      <div className="sidebar_items">
        <Link to="/sudoku-solver">
          <img
            className="sideBar_images_img"
            src={`${active == "sudoku" ? sudukoIconActive : sudukoIcon} `}
            alt=""
          />
        </Link>
      </div>
      <div className="sidebar_items">
        <Link to="/tower-of-hanoi">
          <img
            className="sideBar_images_img"
            src={`${active == "toh" ? toh : tohNormal} `}
            alt=""
          />
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
