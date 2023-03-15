import React, { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import bg from "../../assets/images/Bg_individual.png";
import suduku_home from "../../assets/images/suduku_home.png";
import chess_home from "../../assets/images/chess_home.png";
import pathFinder_home from "../../assets/images/pathFinder_home.png";
import toh_home from "../../assets/images/toh_home.png";
import { Link } from "react-router-dom";
const Home = () => {
  useEffect(() => {
    document.title = "VisualizeIT";
  }, []);

  return (
    <div className="home">
      <span className="home_header">VisualizeIT</span>
      <div className="home_slider">
        <Carousel interval={3000}>
          <Carousel.Item>
            <Link to="/sudoku-solver">
              <img
                className="d-block w-100 slide_image"
                src={suduku_home}
                alt="First slide"
              />
            </Link>
          </Carousel.Item>
          <Carousel.Item>
            <Link to="/nqueens">
              <img
                className="d-block w-100 slide_image"
                src={chess_home}
                alt="Second slide"
              />
            </Link>
          </Carousel.Item>
          <Carousel.Item>
            <Link to="/path-finder">
              <img
                className="d-block w-100 slide_image"
                src={pathFinder_home}
                alt="Third slide"
              />
            </Link>
          </Carousel.Item>
          <Carousel.Item>
            <Link to="/tower-of-hanoi">
              <img
                className="d-block w-100 slide_image"
                src={toh_home}
                alt="Third slide"
              />
            </Link>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
