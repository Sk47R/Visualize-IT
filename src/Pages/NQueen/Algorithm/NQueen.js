function NQueenAlgo(grid, rows, cols) {
  const animation = [];
  let isAnimationNeeded = true;
  const gridSize = grid.length;

  function saveAnimation(i, j) {
    const temp = JSON.parse(JSON.stringify(grid));

    temp[i][j].isActive = true;
    animation.push(temp); // save animation
  }

  function isSafe(row, col) {
    let i, j;

    // for each column checking in all the rows
    for (i = 0; i < row; i++) {
      if (grid[i][col].hasQueen) return false;
    }

    // checking for diagonals (left diagonal)
    let x = row;
    let y = col;
    while (x >= 0 && y >= 0) {
      if (grid[x][y].hasQueen) return false;
      x--;
      y--;
    }
    // checking for diagonals (right diagonal)
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
      if (isAnimationNeeded) {
        animation.push(solutionGrid);
        isAnimationNeeded = false;
      }
      return true;
    }

    // checking for safe position in each column for all rows
    for (let j = 0; j < gridSize; j++) {
      if (isAnimationNeeded) saveAnimation(row, j);
      if (isSafe(row, j)) {
        grid[row][j].hasQueen = true;
        if (isAnimationNeeded) saveAnimation(row, j);
        if (placeQueen(row + 1)) return true;

        grid[row][j].hasQueen = false; //backtracking
      }
    }

    return false;
  }
  if (placeQueen(0)) {
    console.log("soln fould");
  }

  return { grid, animation };
}

export default NQueenAlgo;
