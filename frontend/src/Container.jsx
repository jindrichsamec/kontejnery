import React, { Component, PropTypes } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import Icon from './Icon'
import {containerStyle, containerHovered} from './ContainerStyle';

export default observer(class Container extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }

  showDetail = observable(false);

  handleClick = e => {
    const {onClick, id, name} = this.props;
    onClick(id, name);
  }

  render() {
    const style = this.props.$hover ? containerHovered : containerStyle;
    return (
      <div className="progress-bar-success progress-bar-striped" style={style} onClick={this.handleClick}>
        <Icon name="table" size={18}/>
      </div>)
  }

})
