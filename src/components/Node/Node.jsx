const nodeStyling = {
  position: 'absolute',
  top: '200px',
  left: '200px',
  width: '50px',
  height: '50px',
  backgroundColor: 'rgb(127, 212, 214)',
  borderRadius: '50%'
}

const Node = (props) => {
  return <div style={{
    position: 'absolute',
    top: `${props.top}px`,
    left: `${props.left}px`,
    width: '50px',
    height: '50px',
    backgroundColor: 'rgb(127, 212, 214)',
    borderRadius: '50%'
  }
  } />;
}


export default Node;
