import "./TowerOfHanoi.css";

import Tower from "./components/Tower";

import Slider from "@mui/material/Slider";
import SideBar from "../../Components/SideBar/SideBar";
import slowTurtle from "../../assets/images/mdi_tortoise.png";
import slowestTurtle from "../../assets/images/fluent_animal-turtle-24-filled.png";
import slowRabbit from "../../assets/images/fluent_animal-rabbit-20-filled.png";
import fastRabbit from "../../assets/images/mdi_rabbit.png";

import { useState, useEffect } from "react";

const DEFAULT_RING_COUNT = 3;
const MIN_RING_COUNT = 2;
const MAX_RING_COUNT = 7;

const DEFAULT_SPEED = 3;

let timers = [];

function TowerOfHanoi() {
  useEffect(() => {
    document.title = "Tower of Hanoi";
  }, []);

  const [diskCount, setDiskCount] = useState(DEFAULT_RING_COUNT);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);

  const [tower0, setTower0] = useState(
    Array.from({ length: diskCount }, (_, k) => diskCount - k)
  );
  const [tower1, setTower1] = useState([]);
  const [tower2, setTower2] = useState([]);

  const towers = [tower0, tower1, tower2];

  // Calculate moves required to solve Tower of Hanoi puzzle, and then
  // apply the moves to the Disk components.
  const solveHanoi = (n) => {
    let moves = [];
    const _solveHanoi = (n, from, to, spare) => {
      if (n < 1) {
        return;
      }
      if (n === 1) {
        const move = [from, to];
        moves.push(move);
      } else {
        _solveHanoi(n - 1, from, spare, to);
        _solveHanoi(1, from, to, spare);
        _solveHanoi(n - 1, spare, to, from);
      }
    };
    _solveHanoi(n, 0, 2, 1);

    // Timer is kept track of in order to allow user to cancel visualization
    // at any time by cleadisk all timers and resetting to original state.
    let timer;
    moves.forEach((move, i) => {
      timer = setTimeout(
        () => moveDisk(move[0], move[1]),
        (1 + i) * (100 + 1000 / speed)
      );
      timers.push(timer);
    });
  };

  // Move a disk from one tower to another. The last element of the
  // tower's array represents the top disk on the tower.
  const moveDisk = (from, to) => {
    if (from < 0 || from > 2 || to < 0 || to > 2 || from === to) {
      throw new Error(`Invalid disks: ${from}, ${to}`);
    }

    const movingDisk = towers[from][towers[from].length - 1];
    towers[from] = towers[from].slice(0, towers[from].length - 1);
    towers[to].push(movingDisk);

    updateTowersState();
  };

  const updateTowersState = () => {
    setTower0(towers[0]);
    setTower1(towers[1]);
    setTower2(towers[2]);
  };

  const reset = () => {
    resetInputs();
    resetTowers();
  };

  const resetTowers = () => {
    for (let i = 0; i < timers.length; i++) {
      clearTimeout(timers[i]);
    }

    towers[0] = Array.from({ length: diskCount }, (_, k) => diskCount - k);
    towers[1] = [];
    towers[2] = [];
    updateTowersState();
  };

  const resetInputs = () => {
    setDiskCount(DEFAULT_RING_COUNT);
    setSpeed(DEFAULT_SPEED);
  };

  const onDiskCountChange = (e) => {
    if (e.target.value < MIN_RING_COUNT) {
      e.target.value = MIN_RING_COUNT;
    }

    if (e.target.value > MAX_RING_COUNT) {
      e.target.value = MAX_RING_COUNT;
    }
    console.log("first");
    setDiskCount(e.target.value);
    resetTowers();
  };

  return (
    <div className="toh">
      <div className="toh_left">
        <SideBar active="toh" />
      </div>
      <div className="toh_right">
        <div className="sudukuSolver_right_top">
          <div className="sudukuSolver_right_top_left">
            <span className="sudukuSolver_right_top_left_header">
              Tower of Hanoi
            </span>
          </div>
          <div className="sudukuSolver_right_top_right">
            <div className="sudukuSolver_right_top_right_item margin_right_2">
              <button
                className="sudukuSolver_right_top_right_item_button fill_button"
                onClick={() => solveHanoi(tower0.length)}
              >
                Solve
              </button>
            </div>
            <div className="sudukuSolver_right_top_right_item">
              <button
                className="sudukuSolver_right_top_right_item_button"
                onClick={reset}
              >
                Reset{" "}
              </button>
            </div>
          </div>
        </div>

        <div className="toh_right_body">
          <div className="tower-container">
            <Tower disks={tower0} />
            <Tower disks={tower1} />
            <Tower disks={tower2} />
          </div>

          <div className="toh_right_body_bottom">
            <div className="toh_right_body_bottom_top">
              <span className="toh_right_body_bottom_top_header">
                No. of Disk
              </span>
              <Slider
                marks
                min={MIN_RING_COUNT}
                max={MAX_RING_COUNT}
                value={diskCount}
                onChange={onDiskCountChange}
                sx={{
                  width: "250px",
                  color: "#c0c0c0",
                }}
              />
            </div>
            <div className="toh_right_body_bottom_bottom">
              <span className="toh_right_body_bottom_top_header">Speed</span>
              <div className="toh_right_body_bottom_Down">
                <div className="pathFinder_bottom_item">
                  <img
                    className={`pathFinder_bottom_item_speedIcon ${
                      speed == 3 && "pathFinder_bottom_item_speedIcon_active"
                    }`}
                    src={slowestTurtle}
                    alt=""
                    onClick={() => {
                      setSpeed(3);
                    }}
                  />
                </div>
                <div className="pathFinder_bottom_item">
                  <img
                    className={`pathFinder_bottom_item_speedIcon ${
                      speed == 5 && "pathFinder_bottom_item_speedIcon_active"
                    }`}
                    src={slowTurtle}
                    alt=""
                    onClick={() => {
                      setSpeed(5);
                    }}
                  />
                </div>
                <div className="pathFinder_bottom_item">
                  <img
                    className={`pathFinder_bottom_item_speedIcon ${
                      speed == 7 && "pathFinder_bottom_item_speedIcon_active"
                    }`}
                    src={slowRabbit}
                    onClick={() => {
                      setSpeed(7);
                    }}
                    alt=""
                  />
                </div>
                <div className="pathFinder_bottom_item">
                  <img
                    className={`pathFinder_bottom_item_speedIcon ${
                      speed == 9 && "pathFinder_bottom_item_speedIcon_active"
                    }`}
                    src={fastRabbit}
                    alt=""
                    onClick={() => {
                      setSpeed(9);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TowerOfHanoi;
