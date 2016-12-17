import React, { PropTypes } from 'react'

const Icon = ({ name }) => {
  const className = `fa fa-${name}`
  return(
    <span className={className}></span>
  )
}

Icon.propTypes = {
  name: PropTypes.string.isRequired
}

export default Icon