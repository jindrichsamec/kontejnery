import React, { PropTypes } from 'react'

const Icon = ({ name, size }) => {
  const className = `fa fa-${name}`
  const style = {
    fontSize: size
  }
  return(
    <span className={className} style={style}></span>
  )
}

Icon.propTypes = {
  name: PropTypes.string.isRequired
}

export default Icon