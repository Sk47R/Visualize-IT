function Astar(grid, startNode, endNode) {
  let openSet = []; // contains node to be visited
  let closedSet = []; // contains node that we visited
  let path = []; // shortest path

  let visitedNodes = [];
  openSet.push(startNode);
  console.log(openSet);

  while (openSet.length > 0) {
    let winner = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }

    let current = openSet[winner];
    visitedNodes.push(current);
    if (current == endNode) {
      var temp = current;
      path.push(temp);
      while (temp.previousNode) {
        path.push(temp.previousNode);
        temp = temp.previousNode;
      }
      return { path, visitedNodes };
    }
    // Now as we have visited a node we remove it from the openSet array and push that node to the closeSet array
    openSet = openSet.filter((element) => element !== current);
    closedSet.push(current);
    let neighbors = current.neighbors;
    for (let i = 0; i < neighbors.length; i++) {
      // looping through all neighbors and determining the path

      let neighbor = neighbors[i];
      if (!closedSet.includes(neighbor) && !neighbor.isWall) {
        let tempG = current.g + 1;
        let newPath = false;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }
        if (newPath) {
          neighbor.h = heuristic(neighbor, endNode);

          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previousNode = current;
        }
      }
    }
  }
  console.log(path);
  console.log(visitedNodes);

  return { path, visitedNodes, error: "No Path Found!" };
}

function heuristic(a, b) {
  let d = Math.abs(a.row - a.col) + Math.abs(b.row - b.col);
  // we are using manhattan distance
  return d;
}

export default Astar;
