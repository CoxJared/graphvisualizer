import React from 'react';

const MAX_X = 30;
const MAX_Y = 17;

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
    0: '#444444', //unvisited
    1: '#447777', // visited
    2: '#44AA77', //starting
    3: '#eeee77', //ending
    4: '#999933', //found path
    5: '#aa3333' //no path found
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

class Grid extends React.Component {
  constructor() {
    super();
    let grid = [];
    let prev = [];
    for (let i = 0; i < MAX_Y; i++) {
      let row = [];
      let prevRow = [];
      for (let ii = 0; ii < MAX_X; ii++) {
        row.push(0);
        prevRow.push(null);
      }
      grid.push(row);
      prev.push(prevRow);
    }

    this.state = {
      grid,
      prev,
      clickType: 0,
      queue: [],
      found: false,
      setInterValID: 0
    };
  }

  handleClick = (x, y) => {
    let grid = this.state.grid;
    grid[x][y] = -1;

    if (this.state.clickType == 0) {
      grid[x][y] = 2;
      this.setState({ grid, queue: [[x, y]], clickType: 1 })
    } else if
      (this.state.clickType == 1) {
      grid[x][y] = 3;
      this.setState({ grid, clickType: 2 })
    } else {
      grid[x][y] = -1;
      this.setState({ grid });
    }

    this.setState({ grid });
  }

  getUnvisitedNeigbours = (position) => {
    let possibleNeighbours = getDirectionVectors(position[0], position[1], MAX_Y - 1, MAX_X - 1);
    let availableNeighbours = [];
    possibleNeighbours.forEach(neighbour => {
      if (this.state.grid[neighbour[0]][neighbour[1]] == 0 || this.state.grid[neighbour[0]][neighbour[1]] == 3) {
        availableNeighbours.push([neighbour[0], neighbour[1]]);
      }
    })
    return availableNeighbours
  }

  solve = () => {
    let setInterValID =
      setInterval(() => {
        let { queue, grid, prev } = this.state;
        let newQueue = [];
        while (queue.length > 0) {
          let current = queue.shift();
          if (grid[current[0]][current[1]] == 3) {
            queue = [];
            newQueue = [];

            let solutionChain = [];
            let step = prev[current[0]][current[1]];
            while (prev[step[0]][step[1]] != null) {
              solutionChain.push(step);
              grid[step[0]][step[1]] = 4;
              step = prev[step[0]][step[1]];
            }
            this.setState({ solutionChain, found: true });
          } else {
            if (grid[current[0]][current[1]] == 0)
              grid[current[0]][current[1]] = 1;

            let neighbours = this.getUnvisitedNeigbours(current);
            neighbours.forEach(neighbour => {
              if (!queue.some(x => (
                x[0] == neighbour[0] && x[1] == neighbour[1]
              )) &&
                (!newQueue.some(x => (
                  x[0] == neighbour[0] && x[1] == neighbour[1]
                )))) {
                prev[neighbour[0]][neighbour[1]] = [current[0], current[1]];
                newQueue.push(neighbour);
              }
            });
          }
          if (newQueue.length == 0 && queue.length == 0 && !this.state.found) {
            this.noPositionFound();
          }
        }
        queue = newQueue;
        this.setState({ queue, prev, grid })
      }, 150);
    this.setState({ setInterValID })
  }

  noPositionFound = () => {
    let grid = this.state.grid;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] == 1) {
          grid[i][j] = 5;
        }
      }
    }
    this.setState({ grid })
  }

  randomizeBlanks = () => {
    let grid = this.state.grid;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] == 0 || grid[i][j] == -1) {
          grid[i][j] = ((Math.floor(Math.random() * 3.5) == 1) ? -1 : 0);
        }
      }
    }
    this.setState({ grid });
  }

  clearGrid = () => {
    let grid = [];
    let prev = [];
    for (let i = 0; i < MAX_Y; i++) {
      let row = [];
      let prevRow = [];
      for (let ii = 0; ii < MAX_X; ii++) {
        row.push(0);
        prevRow.push(null);
      }
      grid.push(row);
      prev.push(prevRow);
    }
    clearInterval(this.state.setInterValID);

    this.setState({
      grid,
      prev,
      clickType: 0,
      queue: [],
      found: false,
      setInterValID: 0
    });
  }

  render() {
    return (<div style={gridStyling}>
      {this.state.grid.map((row, y) => (
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
      <button onClick={this.clearGrid}>Clear</button>
    </div>)
  }
}

export default Grid;