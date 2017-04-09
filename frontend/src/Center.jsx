import React from 'react'
import Icon from './Icon'
import {containerStyle} from './Container/ContainerStyle'

const Center = (props) => {
  return <div style={containerStyle} className="top-marker progress-bar progress-bar-striped">
    <Icon name="street-view" size={18} />
  </div>;
}

export default Center;
