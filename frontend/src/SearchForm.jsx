import React from 'react'

import { FormGroup, FormControl, Button } from 'react-bootstrap'

const SearchForm = (props) => {
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
        <Button type="button" bsStyle="primary">Search</Button>
        <Button type="button" bsStyle="success">Locate</Button>
      </FormGroup>
    </div>
  )
}

export default SearchForm
