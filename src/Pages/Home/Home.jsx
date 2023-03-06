import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const links = [
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

  return (
    <Box
      sx={{
        width: 300,
        marginTop: "5%",
        marginX: "auto",
        padding: "1.2rem",
        height: "fit-content",
        borderRadius: "10px",
        boxShadow: 3,

        bgcolor: "#2E3840",
        color: "primary.contrastText",

        display: "grid",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginTop: "1rem",
        }}
      >
        Visualize
      </Typography>

      <List sx={{ width: "100%" }}>
        {links.map((link, index) => (
          <div>
            <ListItem
              key={index}
              component={Link}
              to={link.route}
              sx={{
                bgcolor: "#2E3840",
                color: "primary.contrastText",
                fontWeight: "bold",
                fontSize: "1.2rem",
                "&:hover": {
                  backgroundColor: "#2E3840",
                  color: "primary.contrastText",
                },
              }}
            >
              <ListItemText primary={link.name} />
            </ListItem>
            <Divider
              sx={{
                borderBottomWidth: 2,
                borderColor: "#fafafa",
              }}
            />
          </div>
        ))}
      </List>
    </Box>
  );
};

export default Home;
