import React from "react";
import "./SideBar.css";
import RouteIcon from "@mui/icons-material/Route";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import sudukoIcon from "../../assets/images/arcticons_sudoku.png";
import sudukoIconActive from "../../assets/images/arcticons_sudoku_active.png";

const SideBar = ({ active }) => {
  return (
    <div className="sidebar">
      <div className="sidebar_items margin_bottom_4">
        <Link to="/path-finder">
          <RouteIcon
            className={`sideBar_images ${active && "sideBar_images_active"}`}
          />
        </Link>
      </div>
      <div className="sidebar_items">
        <Link to="/nqueens">
          <Icon icon="mdi:chess-queen" className="sideBar_images" />
        </Link>
      </div>
      <div className="sidebar_items">
        <Link to="/sudoku-solver">
          <img
            className="sideBar_images_img"
            src={`${active ? sudukoIcon : sudukoIconActive} `}
            alt=""
          />
        </Link>
      </div>
      <div className="sidebar_items">
        <Link to="/tower-of-hanoi">
          <img
            className="sideBar_images_img"
            src={`${active ? sudukoIcon : sudukoIconActive} `}
            alt=""
          />
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
