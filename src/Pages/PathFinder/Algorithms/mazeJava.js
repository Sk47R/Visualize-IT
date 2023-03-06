function mazeJava(grid, current, rows, cols) {
  current.isWall = false;
  let frontierCells;

  frontierCells = frontierCellFunc(current, grid);
  while (frontierCells.length > 0) {
    console.log("click");
    // Pick Up random cell
    let frontierCell;
    let r = Math.floor(Math.random() * frontierCells.length);
    frontierCell = frontierCells[r];
    // Pick Up random cell

    // Getting neighbors of random cell in distance 2
    let frontierNeighbors = passageCell(frontierCell, grid);

    // Getting neighbors of random cell in distance 2
    if (frontierNeighbors.length > 0) {
      // pickup random neighbor
      let neighbor;

      let r = Math.floor(Math.random() * frontierNeighbors.length);
      neighbor = frontierNeighbors[r];
      console.log(r);

      //   connect the frontier with the neighbor
      connect(frontierCell, neighbor, grid);
    }

    frontierCells.push(...frontierCellFunc(frontierCell, grid));

    let index = frontierCells.indexOf(frontierCell);

    frontierCells.splice(index, 1); // 2nd
  }
  console.log(grid);

  return grid;
}

function connect(frontierCell, neighbor, grid) {
  let inBetweenRow = (frontierCell.row + neighbor.row) / 2;
  let inBetweenCol = (frontierCell.col + neighbor.col) / 2;
  frontierCell.isWall = false;

  grid[inBetweenRow][inBetweenCol].isWall = false;
  neighbor.isWall = false;
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
      grid[newRow][newCol].isWall == isWall
    ) {
      frontier.push(grid[newRow][newCol]);
    }
  }

  return frontier;
}

function frontierCellFunc(cell, grid) {
  return cellAround(cell, true, grid);
}

function passageCell(cell, grid) {
  return cellAround(cell, false, grid);
}

export default mazeJava;
