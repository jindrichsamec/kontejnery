import React, { PropTypes } from 'react'
import { Navbar } from 'react-bootstrap'
import SearchForm from './SearchForm'
import GeoLocateButton from './GeoLocateButton'

const Controller = ({ onSearch, onLocate }) => {

  return(
    <Navbar inverse collapseOnSelect fixedTop fluid>
      <Navbar.Header>
        <Navbar.Toggle />
        <Navbar.Brand>
          Velkoobjemáky
        </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Collapse>
        <Navbar.Form pullLeft>
          <SearchForm onSearch={onSearch}/>
        </Navbar.Form>
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
