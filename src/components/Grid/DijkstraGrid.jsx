import React from 'react'

const MAX_X = 10;
const MAX_Y = 10;

const gridStyling = {
  width: `${MAX_X * 50}px`,
  height: `${MAX_Y * 50}px`,
  backgroundColor: '#555555'
}

const rowStyling = {
  width: `${MAX_X * 50}px`,
  height: `50px`,
  backgroundColor: '#222222',
  display: 'flex'
}

const elemStyling = (colorId) => {
  let colors = {
    0: '#404040', //unvisited
    1: '#383838', //unvisited
    2: '#333333', //unvisited
    3: '#303030', //unvisited
    4: '#282828', //unvisited
    10: '#447777', // visited
    11: '#44AA77', //starting
    12: '#eeee77', //ending
    13: '#999933', //found path
    14: '#aa3333' //no path found
  }
  return ({
    width: '40px',
    height: '40px',
    margin: '5px',
    backgroundColor: colors[colorId],
    transition: '.2s ease'
  });
}


function getDirectionVectors(x, y, maxX, maxY) {
  let dx = [-1, 0, 1, 0];
  let dy = [0, -1, 0, 1];
  let adjacentCells = [];

  for (let i = 0; i < 4; i++) {
    let xx = x + dx[i];
    let yy = y + dy[i];

    if (xx < 0 || yy < 0 || xx > maxX || yy > maxY) continue;
    adjacentCells.push([xx, yy]);
  }
  return adjacentCells;
}

class DijkstraGrid extends React.Component {
  constructor() {
    super();
    let grid = [];
    let prev = [];
    let shortestFound = [];
    let weightedPaths = [];
    let coloredGrid = [];
    for (let i = 0; i < MAX_Y; i++) {
      let row = [];
      let prevRow = [];
      let shortestFoundRow = [];
      let weightedPathsRow = [];
      let colorRow = [];
      for (let ii = 0; ii < MAX_X; ii++) {
        row.push(0);
        prevRow.push(null);
        shortestFoundRow.push(false);
        weightedPathsRow.push(-1);
        colorRow.push(0);
      }
      grid.push(row);
      prev.push(prevRow);
      shortestFound.push(shortestFoundRow);
      weightedPaths.push(weightedPathsRow);
      coloredGrid.push(colorRow);
    }

    this.state = {
      grid,
      prev,
      shortestFound,
      weightedPaths,
      coloredGrid,
      clickType: 0,
      queue: [],
      found: false,
      setInterValID: 0,
    };
  }

  handleClick = (x, y) => {
    let { grid, coloredGrid } = this.state;
    // grid[x][y] = -1;

    if (this.state.clickType == 0) {
      grid[x][y] = 11;
      coloredGrid[x][y] = 11;
      this.setState({ grid, queue: [[x, y]], clickType: 1 })
    } else if
      (this.state.clickType == 1) {
      console.log("2")
      grid[x][y] = 12;
      coloredGrid[x][y] = 12;
      this.setState({ grid, clickType: 2 })
    } else {
      if (grid[x][y] < 4) {
        grid[x][y]++;
        coloredGrid[x][y]++;
      } else if (grid[x][y] == 5) {
        // grid
      }
      this.setState({ grid, coloredGrid });
    }

    this.setState({ grid });
  }

  randomizeBlanks = () => {
    let { grid, coloredGrid } = this.state;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] < 5) {
          grid[i][j] = (Math.floor(Math.random() * 5));
          coloredGrid[i][j] = grid[i][j];
        }
      }
    }
    this.setState({ grid, coloredGrid });
  }

  getNeighboursToUpdate = (node) => {
    let { grid, weightedPaths, shortestFound } = this.state;

  }

  solve = () => {
    let { grid, prev, weightedPaths, shortestFound, queue } = this.state;
    let currentNode = queue.shift();
    console.log("current node", currentNode);
    shortestFound[currentNode[0]][currentNode[1]] = true;
    let nodeWeight = weightedPaths[currentNode[0]][currentNode[1]];
    let possibleNeighboursToUpdate = getDirectionVectors(currentNode[0], currentNode[1], MAX_Y - 1, MAX_X - 1);
    possibleNeighboursToUpdate.forEach(neighbour => {
      if (weightedPaths[neighbour[0]][neighbour[1]] > (nodeWeight + grid[neighbour[0]][neighbour[1]])) {
        shortestFound[neighbour[0]][neighbour[1]] = true;
        weightedPaths[neighbour[0]][neighbour[1]] = nodeWeight + grid[neighbour[0]][neighbour[1]];
        prev[neighbour[0]][neighbour[1]] = [currentNode[0], currentNode[1]];
        if (!queue.some(node => node[0] == neighbour[0] && node[1] == neighbour[1]))
          queue.push([neighbour[0], neighbour[1]]);
      } else if (weightedPaths[neighbour[0]][neighbour[1]] == 1) {
        weightedPaths[neighbour[0]][neighbour[1]] = nodeWeight + grid[neighbour[0]][neighbour[1]];
        prev[neighbour[0]][neighbour[1]] = [currentNode[0], currentNode[1]];
        queue.push([neighbour[0], neighbour[1]]);
      }
    })
    console.log("grid", grid);
    console.log("prev", prev);
    console.log("weighted path", weightedPaths);
    console.log("shortestFoudn", shortestFound);
    console.log("queue", queue);
    this.setState({ grid, prev, weightedPaths, shortestFound, queue })
  }

  render() {
    return (<div style={gridStyling}>
      {this.state.coloredGrid.map((row, y) => (
        <div style={rowStyling}>
          {
            row.map((elem, x) => (
              <div onClick={this.handleClick.bind(this, y, x)} style={elemStyling(elem)} />
            ))
          }
        </div>
      ))}
      <button onClick={this.solve}>Click</button>
      <button onClick={this.randomizeBlanks}>Random</button>
      {/* <button onClick={this.clearGrid}>Clear</button> */}
    </div>)
  }
}

export default DijkstraGrid;