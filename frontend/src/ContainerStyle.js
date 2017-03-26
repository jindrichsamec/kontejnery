
const SIZE = 30;

const containerStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: SIZE,
  height: SIZE,
  left: -SIZE / 2,
  top: -SIZE / 2,
  backgroundClip: 'padding-box',
  borderRadius: SIZE,
  textAlign: 'center',
  fontWeight: 'bold',
  padding: '6px 4px'
};


const containerHovered = {
  ...containerStyle,
  cursor: 'pointer'
}

export {containerStyle, SIZE, containerHovered}
