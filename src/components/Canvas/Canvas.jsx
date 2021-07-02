import React from 'react';
import Node from '../Node/Node';
import Edge from '../Edge/Edge';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstSelection: 0,
      secondSelection: 0
    }
  }

  selectNode = (node) => {
    console.log(node)
    if (!this.state.firstSelection) {
      this.setState({ firstSelection: node })
    } else if (!this.state.secondSelection) {
      this.setState({ secondSelection: node })
    }
  }

  render() {
    return (
      <div>
        <Node top={400} left={400} value={1} onClick={this.selectNode.bind(this, 1)} />
        <Node top={450} left={550} value={2} onClick={this.selectNode.bind(this, 2)} />
        <Edge points={[40, 40, 450, 550]} />
        {/* <line x1="0" y1="0" x2="200" y2="200" stroke="black" /> */}

      </div>)
  }
}

export default Canvas;