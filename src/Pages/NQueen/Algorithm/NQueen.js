function NQueenAlgo(grid) {
  const animation = [];
  let addAnimation = true;
  const gridSize = grid.length;

  function saveAnimation(i, j) {
    const temp = JSON.parse(JSON.stringify(grid));
    temp[i][j].isActive = true;
    animation.push(temp); // save animation
  }

  function isSafe(row, col) {
    // check the cells in the same column above the current row
    for (let i = 0; i < row; i++) {
      if (grid[i][col].hasQueen) return false;
    }

    // check for diagonals (left) above the current row
    let x = row;
    let y = col;
    while (x >= 0 && y >= 0) {
      if (grid[x][y].hasQueen) return false;
      x--;
      y--;
    }

    // check for diagonals (right) above the current row
    x = row;
    y = col;
    while (x >= 0 && y < gridSize) {
      if (grid[x][y].hasQueen) return false;
      x--;
      y++;
    }

    return true;
  }

  function placeQueen(row) {
    if (row >= gridSize) {
      // all queen placed
      const solutionGrid = JSON.parse(JSON.stringify(grid));
      if (addAnimation) {
        animation.push(solutionGrid);
        addAnimation = false;
      }

      return true;
    }

    // checking for safe position in each column for all rows
    for (let j = 0; j < gridSize; j++) {
      if (addAnimation) saveAnimation(row, j);

      if (isSafe(row, j)) {
        grid[row][j].hasQueen = true;
        if (addAnimation) saveAnimation(row, j);
        if (placeQueen(row + 1)) return true;

        grid[row][j].hasQueen = false; // backtracking
      }
    }

    return false;
  }

  if (placeQueen(0)) {
    console.log("Solution found!");
  }

  return { grid, animation };
}

export default NQueenAlgo;
