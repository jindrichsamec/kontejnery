import React, { PropTypes } from 'react'
import { Navbar } from 'react-bootstrap'
import SearchForm from './SearchForm'
import GeoLocateButton from './GeoLocateButton'
import Icon from './Icon'

const Controller = ({ onSearch, onLocate }) => {

  return(
    <Navbar collapseOnSelect fixedTop fluid>
      <Navbar.Header>
        <Navbar.Toggle />
        <Navbar.Brand>
          <Icon name="table" /> <span className="hidden-xs" style={{fontFamily: 'Impact', fontWeight: 'normal'}}>Velkoobjemáky</span>
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
