import React, { Component } from "react";
import Node from "../../Components/PathFinder/Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "./Algorithms/dijkstra";
import { useState } from "react";
import { useEffect } from "react";
import Astar from "./Algorithms/astar";
import "./PathFinder.css";
import Navbar from "../../Components/Navbar/Navbar";

const rows = 13;
const cols = 35;
const START_NODE_ROW = 4;
const START_NODE_COL = 7;
const FINISH_NODE_ROW = rows - 1;
const FINISH_NODE_COL = cols - 1;

const PathFinder = () => {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < rows; row++) {
      const currentRow = [];
      for (let col = 0; col < cols; col++) {
        currentRow.push(createNode(row, col));
      }
      grid.push(currentRow);
    }
    return grid;
  };

  const addNeighbors = (grid) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j].addNeighbors(grid);
      }
    }
  };

  const createNode = (row, col) => {
    return {
      col, //j
      row, //i
      g: 0,
      f: 0,
      h: 0,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isEnd: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
      neighbors: [],
      addNeighbors(grid) {
        let i = row;
        let j = col;
        if (i > 0) this.neighbors.push(grid[i - 1][j]);
        if (i < rows - 1) this.neighbors.push(grid[i + 1][j]);
        if (j > 0) this.neighbors.push(grid[i][j - 1]);
        if (j < cols - 1) this.neighbors.push(grid[i][j + 1]);
      },
    };
  };

  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };
  useEffect(() => {
    const grid = getInitialGrid();
    setGrid(grid);
  }, []);

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(
          `pathFinder-node-${node.row}-${node.col}`
        ).className = "pathFinder-node pathFinder-node-visited";
      }, 10 * i);
    }
  };

  const visualizeShortestPath = (shortestPathNodes) => {
    for (let i = 0; i < shortestPathNodes.length; i++) {
      setTimeout(() => {
        const node = shortestPathNodes[i];
        document.getElementById(
          `pathFinder-node-${node.row}-${node.col}`
        ).className = "pathFinder-node pathFinder-node-shortest-path";
      }, 10 * i);
    }
  };
  const visualizePath = (visitedNodes, path) => {
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          visualizeShortestPath(path);
        }, 20 * i);
      } else {
        setTimeout(() => {
          const node = visitedNodes[i];
          document.getElementById(
            `pathFinder-node-${node.row}-${node.col}`
          ).className = "pathFinder-node pathFinder-node-visited";
        }, 20 * i);
      }
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(
          `pathFinder-node-${node.row}-${node.col}`
        ).className = "pathFinder-node pathFinder-node-shortest-path";
      }, 50 * i);
    }
  };

  const visualizeDijkstra = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    // addNeighbors(grid);

    // const out = Astar(grid, startNode, finishNode);
    // const nodesInShortestPathOrder = out.path;
    // const visitedNodesInOrder = out.visitedNodes;
    // visualizePath(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  return (
    <div className="pathFinder">
      <Navbar />
      <button onClick={() => visualizeDijkstra()}>
        Visualize Dijkstra's Algorithm
      </button>
      <div className="pathFinder-grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx} className="pathFinder-grid-row">
              {row.map((node, nodeIdx) => {
                const { row, col, isEnd, isStart, isWall } = node;
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    isFinish={isEnd}
                    isStart={isStart}
                    isWall={isWall}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp()}
                    row={row}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PathFinder;
