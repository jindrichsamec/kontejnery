import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import Icon from '../Icon'
import {containerStyle, containerHovered, expiredStyle} from './ContainerStyle';

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
      style = expiredStyle;
    }
    return (
      <div style={style} onClick={this.handleClick}>
        <Icon name="container" size={18}/>
      </div>)
  }

})
