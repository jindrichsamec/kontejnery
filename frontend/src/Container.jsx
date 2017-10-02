import React from 'react'
import PropTypes from 'prop-types'
import Icon from './Icon'
import ContainerMarker from './ui/map/ContainerMarker';

const Container = ({ till, onClick, slug, name }) => {
  return (<ContainerMarker expired={till.getTime() < Date.now()} onClick={e => onClick(slug, name)}>
    <Icon name="container" size={18}/>
  </ContainerMarker>)
}

Container.propTypes = {
  till: PropTypes.instanceOf(Date).isRequired,
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Container
