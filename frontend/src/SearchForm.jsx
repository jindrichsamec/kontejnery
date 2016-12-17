import React, { PropTypes } from 'react'
import GeoLocateButton from './GeoLocateButton';
import { FormGroup, FormControl, Button } from 'react-bootstrap'

const SearchForm = ({ onSearch, onLocate}) => {
  return(
    <div className="card card-block controller" >
      <FormGroup>
        <FormControl componentClass="select" placeholder="Select one...">
          <option value="today">Dnes</option>
          <option value="tomorrow">Zítra</option>
          <option value="thisweek">Tento týden</option>
          <option value="nextweek">Příští týden</option>
          <option value="all">Vše</option>
        </FormControl>
        <Button type="button" bsStyle="primary" onClick={onSearch}>Search</Button>
        <GeoLocateButton onLocate={onLocate}/>
      </FormGroup>
    </div>
  )
}

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onLocate: PropTypes.func.isRequired,

}

export default SearchForm
