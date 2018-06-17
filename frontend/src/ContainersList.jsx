// @flow
import React, { PureComponent } from 'react'
import Container from './Container'

type Props = {
  onContainerClick: Function,
  containers: Array<Object>
}
class ContainersList extends PureComponent<Props> {



  render () {
    const { containers } = this.props
    console.log('reneding containers...', containers.length)
    return containers.map(container => this.renderContainer(container))
  }
}

export default ContainersList
