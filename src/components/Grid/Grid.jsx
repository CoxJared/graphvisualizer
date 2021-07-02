import React from 'react'


const gridStyling = {
  width: '500px',
  height: '500px',
  backgroundColor: '#555555'
}

const rowStyling = {
  width: '500px',
  height: '50px',
  backgroundColor: '#222222',
  display: 'flex'
}

const elemStyling = (colorId) => {
  let colors = {
    0: '#444444',
    1: '#447777',
    2: '#44AA77',
    3: '#CC4444'
  }
  return ({
    width: '40px',
    height: '40px',
    margin: '5px',
    backgroundColor: colors[colorId]
  });
}

function getDirectionVectors(x, y, maxX, maxY) {
  let dx = [-1, 1, 0, 0];
  let dy = [0, 0, -1, 1];
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
    let grid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 3, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    this.state = {
      grid,
      startingPosition: [2, 3],
      endingPosition: [8, 7],
      queue: [[2, 3]]
    };
  }

  getNeigbours(position) {
    let possibleNeighbours = getDirectionVectors(position[0], position[1], 9, 9);
    console.log(position);
    console.log(possibleNeighbours);
  }

  solve = () => {
    if (this.state.queue.length > 0) {
      let queue = this.state.queue;
      let current = queue.shift();
      let neighbours = this.getNeigbours(current);


      this.setState({ queue })
    }
  }


  render() {
    return (<div style={gridStyling}>
      {this.state.grid.map(row => (
        <div style={rowStyling}>
          {
            row.map(elem => (
              <div style={elemStyling(elem)} />
            ))
          }
        </div>
      ))}
      <button onClick={this.solve}>Click</button>
    </div>)
  }
}

export default Grid;