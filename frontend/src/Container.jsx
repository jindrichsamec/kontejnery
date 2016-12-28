import React, { Component, PropTypes } from 'react'
import { Popover, Overlay } from 'react-bootstrap'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import Icon from './Icon'
import ContainerDetail from './ContainerDetail'

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
      <div className="container">
        <a onClick={this.handleClick}>
          <Icon name="map-marker" size={24} />
        </a>

        <Overlay
          show={this.obState.showDetail}
          target={this.obState.target}
          placement="bottom"
          container={this}>
            <Popover id={this.props.id} title={this.props.name}>
            <ContainerDetail id={this.props.id} name={this.props.name} />
            </Popover>
        </Overlay>
      </div>)
  }

})
