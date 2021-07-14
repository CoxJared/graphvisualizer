import React from 'react'

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
    // grid[x][y] = -1;

    if (this.state.clickType == 0) {
      console.log("1")
      grid[x][y] = 11;
      this.setState({ grid, queue: [[x, y]], clickType: 1 })
    } else if
      (this.state.clickType == 1) {
      console.log("2")
      grid[x][y] = 12;
      this.setState({ grid, clickType: 2 })
    } else {
      if (grid[x][y] < 4) {
        grid[x][y]++;
      } else if (grid[x][y] == 5) {
        // grid
      }
      this.setState({ grid });
    }

    this.setState({ grid });
  }

  randomizeBlanks = () => {
    let grid = this.state.grid;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] < 5) {
          grid[i][j] = (Math.floor(Math.random() * 5));
        }
      }
    }
    this.setState({ grid });
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
      {/* <button onClick={this.solve}>Click</button> */}
      <button onClick={this.randomizeBlanks}>Random</button>
      {/* <button onClick={this.clearGrid}>Clear</button> */}
    </div>)
  }
}

export default DijkstraGrid;