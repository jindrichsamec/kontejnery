import React, { Component, PropTypes } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import Icon from '../Icon'
import {containerStyle, containerHovered} from './ContainerStyle';

export default observer(class Container extends Component {

  static propTypes = {
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }

  showDetail = observable(false);

  handleClick = e => {
    const {onClick, slug, name} = this.props;
    onClick(slug, name);
  }

  render() {
    const { till, $hover } = this.props
    let style = $hover ? containerHovered : containerStyle;

    if (till.getTime() < Date.now()) {
      style = {...style, color: 'silver', borderColor: 'silver', zIndex: 0};
    }
    return (
      <div style={style} onClick={this.handleClick}>
        <Icon name="container" size={18}/>
      </div>)
  }

})
