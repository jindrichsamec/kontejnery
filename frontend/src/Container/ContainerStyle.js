
const SIZE = 30;

const iconBase = {
  width: SIZE,
  height: SIZE,
  display: 'inline-block',
  backgroundClip: 'padding-box',
  borderRadius: SIZE,
  textAlign: 'center',
  fontWeight: 'bold',
  padding: '4px 3px',
  border: '1px solid #58cf90',
  color: '#58cf90',
  background: 'white',
  zIndex: +1,
}

const containerStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  ...iconBase,
  position: 'absolute',
  left: -SIZE / 2,
  top: -SIZE / 2
};


const containerHovered = {
  ...containerStyle,
  cursor: 'pointer'
}

const expiredStyle = {
  ...containerStyle,
  color: 'silver',
  borderColor: 'silver',
  zIndex: 0
}

export {
  containerStyle,
  SIZE,
  containerHovered,
  iconBase,
  expiredStyle
}
