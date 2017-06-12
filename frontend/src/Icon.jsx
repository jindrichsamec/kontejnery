import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({ name, size }) => {
  const className = `fa fa-${name}`
  const style = {
    fontSize: size
  }
  return(
    <span className={className} style={style} />
  )
}

Icon.propTypes = {
  name: PropTypes.string.isRequired
}

export default Icon
