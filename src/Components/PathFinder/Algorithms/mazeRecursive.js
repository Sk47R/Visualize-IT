function mazeRecursive(grid, current, rows, cols) {
  console.log("clled");
  let stack = [];
  current.isMazeVisited = true;
  current.isCurrent = true;
  let unvisitedNodes = getAllNodes(grid, rows, cols);
  let neighborList = [];
  // loop
  while (unvisitedNodes.length > 0) {
    let frontierCells = frontierCellFunc(current, grid); // gives the neighbors
    if (frontierCells.length > 0) {
      let neighbor;

      let r = Math.floor(Math.random() * frontierCells.length);
      neighbor = frontierCells[r];
      neighbor.isMazeVisited = true;
      stack.push(current);

      removeWalls(current, neighbor, grid);

      current = neighbor;
      neighborList.push(current);

      current.isCurrent = true;
      unvisitedNodes = getAllNodes(grid, rows, cols);
    } else if (stack.length > 0) {
      current = stack.pop();
      neighborList.push(current);
    }
  }
  console.log(neighborList);
  return grid;
}

function removeWalls(current, neighbor, grid) {
  let x = current.row - neighbor.row;

  if (x === 2) {
    if (isValidPosition(current.row - 1, current.col, grid)) {
      console.log(current);
      console.log(neighbor);
      grid[current.row - 1][current.col].isWall = false;
    }
  } else if (x == -2) {
    if (isValidPosition(current.row + 1, current.col, grid))
      grid[current.row + 1][current.col].isWall = false;
  }

  let y = current.col - neighbor.col;

  if (y === 2) {
    if (isValidPosition(current.row, current.col - 1, grid)) {
      grid[current.row][current.col - 1].isWall = false;
    }
  } else if (y == -2) {
    if (isValidPosition(current.row, current.col + 1, grid)) {
      grid[current.row][current.col + 1].isWall = false;
    }
  }
}

function getAllNodes(grid, rows, cols) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      if (!node.isMazeVisited && !node.isWall) {
        nodes.push(node);
      }
    }
  }

  return nodes;
}

function isValidPosition(row, col, grid) {
  return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
}

function cellAround(cell, isWall, grid) {
  let frontier = [];
  let DIRECTIONS = [
    [0, -2],
    [0, 2],
    [2, 0],
    [-2, 0],
  ];
  for (let i = 0; i < DIRECTIONS.length; i++) {
    let newRow = cell.row + DIRECTIONS[i][0];
    let newCol = cell.col + DIRECTIONS[i][1];

    if (
      isValidPosition(newRow, newCol, grid) &&
      grid[newRow][newCol].isWall == isWall &&
      !grid[newRow][newCol].isMazeVisited
    ) {
      frontier.push(grid[newRow][newCol]);
    }
  }

  return frontier;
}

function frontierCellFunc(cell, grid) {
  return cellAround(cell, false, grid);
}

export default mazeRecursive;
