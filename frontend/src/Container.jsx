import React, { Component, PropTypes } from 'react'
// import { Popover, Overlay } from 'react-bootstrap'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import Icon from './Icon'
// import ContainerDetail from './ContainerDetail'

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
 // borderWidth: 5,
  borderRadius: SIZE,
  textAlign: 'center',
  // color: '#3f51b5',
  //fontSize: 16,
  fontWeight: 'bold',
  padding: '6px 4px'
};

export default observer(class Container extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }

  obState = observable({
    showDetail: false,
    target: null
  });

  handleClick = e => {
    this.obState.showDetail = !this.obState.showDetail
    this.obState.target = e.target
  }

  render() {
    return (
      <div className="progress-bar-success progress-bar-striped" style={containerStyle} >
        <Icon name="table" size={18}/>
      </div>)
  }

})
