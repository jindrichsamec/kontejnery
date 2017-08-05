import React from 'react'
import PropTypes from 'prop-types'
import Icon from './Icon'
import ContainerWrapper from './ui/Container';

const Container = ({ till, onClick, slug, name }) => {
  return (<ContainerWrapper expired={till.getTime() < Date.now()} onClick={e => onClick(slug, name)}>
    <Icon name="container" size={18}/>
  </ContainerWrapper>)
}

Container.propTypes = {
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Container
