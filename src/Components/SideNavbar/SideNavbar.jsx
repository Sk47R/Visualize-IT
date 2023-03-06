import StickySideButton from "../StickySideButton/StickySideButton";

import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import HomeIcon from "@mui/icons-material/Home";

import { useLocation, Link } from "react-router-dom";

import { useState } from "react";

export default function SideNavbar() {
  const [open, setOpen] = useState(false);

  const location = useLocation();

  const navItems = [
    {
      name: "Home",
      route: "/",
    },
    {
      name: "N-Queens",
      route: "/nqueens",
    },
    {
      name: "Path finder",
      route: "/path-finder",
    },
    {
      name: "Sudoku solver",
      route: "/sudoku-solver",
    },
    {
      name: "Tower of Hanoi",
      route: "/tower-of-hanoi",
    },
  ];

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };

  const list = () => (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        backgroundColor: "#343434",
        color: "#fff",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navItems.map((navItem, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component={Link} to={navItem.route}>
              {navItem.name === "Home" && <HomeIcon />}&nbsp;
              <ListItemText primary={navItem.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    location.pathname !== "/" && (
      <div>
        <StickySideButton onClick={toggleDrawer(true)}>
          <KeyboardDoubleArrowRightIcon fontSize="large" />
        </StickySideButton>

        <SwipeableDrawer
          anchor="left"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={0}
        >
          {list()}
        </SwipeableDrawer>
      </div>
    )
  );
}
