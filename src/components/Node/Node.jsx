const valueStyle = {
  position: 'relative',
  top: '0px',
  width: 'auto',
  height: 'auto',
  marginBlockStart: '0',
  marginBlockEnd: '0',
  color: '#555555',
  textAlign: 'center',
  margin: 'auto'
}

const Node = (props) => {
  return <div style={{
    position: 'absolute',
    top: `${props.top}px`,
    left: `${props.left}px`,
    width: '70px',
    height: '70px',
    backgroundColor: 'rgb(127, 212, 214)',
    borderRadius: '50%',
  }
  } onClick={props.onClick}>
    <h1 style={valueStyle}>{props.value}</h1>
  </div>;
}


export default Node;
