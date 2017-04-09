import React, { PropTypes } from 'react'
import { Navbar } from 'react-bootstrap'
import Icon from './Icon'
import SearchForm from './SearchForm'
import GeoLocateButton from './GeoLocateButton'

const Controller = ({ onSearch, onLocate }) => {

  return(
    <Navbar collapseOnSelect fixedTop fluid>
      <Navbar.Header>
        <Navbar.Toggle />
        <Navbar.Brand>
          <span className="hidden-xs">Velk </span>
          <Icon name="logo" size={24} />
          <span className="hidden-xs"> objemáky</span>
        </Navbar.Brand>

        <Navbar.Form pullLeft className="search-form">
          <SearchForm onSearch={onSearch}/>
        </Navbar.Form>
      </Navbar.Header>

      <Navbar.Collapse>
        <Navbar.Form pullRight>
          <GeoLocateButton onLocate={onLocate}/>
        </Navbar.Form>
      </Navbar.Collapse>
    </Navbar>
  )
}

Controller.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onLocate: PropTypes.func.isRequired,
}

export default Controller
