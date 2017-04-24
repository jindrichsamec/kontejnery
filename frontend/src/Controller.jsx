import React, { PropTypes } from 'react'
import SearchForm from './SearchForm'
import Icon from './Icon'

const Controller = ({ onSearch, onLocate }) => {

  const style = {
    display: 'flex',
    position: 'absolute',
    zIndex: 300,
    color: 'white',
    backgroundColor: 'rgba(255,255,255, 0.85)',
    margin: '10px 10px 0 10px',
    border: 0,
    maxWidth: '380px',
    padding: 0,
    boxShadow: '0 2px 4px rgba(0,0,0,0.2), 0 -1px 0px rgba(0,0,0,0.02)',
  }

  const iconStyle = {
    width: '35px',
    height: '35px',
    display: 'inline-block',
    backgroundClip: 'padding-box',
    borderRadius: '30px',
    textAlign: 'center',
    fontWeight: 'bold',
    padding: '4px 3px',
    border: '2px solid white',
    color: '#fff',
    margin: '6px 10px'
  }

  return(
      <div className="navbarr" style={style}>
        <div style={iconStyle} className="col-2">
          <Icon name="logo" size={20}/>
        </div>
        <div className="col-10">
          <SearchForm onSearch={onSearch} />
        </div>
      </div>
  )
}

Controller.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onLocate: PropTypes.func.isRequired,
}

export default Controller
