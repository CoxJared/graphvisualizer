import React from 'react'

const MAX_X = 20;
const MAX_Y = 15;

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
    0: '#444444',
    1: '#447777',
    2: '#44AA77',
    3: '#CC4444',
    4: '#999933'
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
    // let startingPosition = [2, 3];
    // let endingPosition = [5, 7];
    // grid[startingPosition[0]][startingPosition[1]] = 2;
    // grid[endingPosition[0]][endingPosition[1]] = 3;

    this.state = {
      grid,
      prev,
      // startingPosition,
      // endingPosition,
      clickType: 0,
      queue: []
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
    setInterval(() => {
      if (this.state.queue.length > 0) {
        let { queue, grid, prev } = this.state;
        let current = queue.shift();

        if (grid[current[0]][current[1]] == 3) {
          queue = [];

          let solutionChain = [];
          let step = prev[current[0]][current[1]];
          while (prev[step[0]][step[1]] != null) {
            solutionChain.push(step);
            grid[step[0]][step[1]] = 4;
            step = prev[step[0]][step[1]];
          }
          this.setState({ solutionChain });
        } else {

          if (grid[current[0]][current[1]] == 0)
            grid[current[0]][current[1]] = 1;

          let neighbours = this.getUnvisitedNeigbours(current);
          neighbours.forEach(neighbour => {
            if (!queue.some(x => (
              x[0] == neighbour[0] && x[1] == neighbour[1]
            ))) {
              prev[neighbour[0]][neighbour[1]] = [current[0], current[1]];
              queue.push(neighbour);
            }
          });
        }
        this.setState({ queue, prev, grid })

      }
    }, 100);
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
    </div>)
  }
}

export default Grid;