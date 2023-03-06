import React from "react";
import "./SideBar.css";
import RouteIcon from "@mui/icons-material/Route";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

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
    </div>
  );
};

export default SideBar;
