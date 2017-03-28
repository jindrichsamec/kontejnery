import React, { PropTypes } from 'react'
import { Navbar } from 'react-bootstrap'
import SearchForm from './SearchForm'
import GeoLocateButton from './GeoLocateButton'
import Icon from './Icon'

const Controller = ({ onSearch, onLocate }) => {

  return(
    <Navbar collapseOnSelect fixedTop fluid>
      <Navbar.Header>
        <Navbar.Brand>
          <Icon name="table" /> Velkoobjemáky
        </Navbar.Brand>
        <Navbar.Toggle />
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
