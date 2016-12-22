import React, { PropTypes } from 'react'
import SearchForm from './SearchForm'
import GeoLocateButton from './GeoLocateButton'

const Controller = ({ onSearch, onLocate }) => {
  return(
    <div className="card card-block controller">
      <SearchForm onSearch={onSearch}/>
      <GeoLocateButton onLocate={onLocate}/>
    </div>
  )
}

Controller.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onLocate: PropTypes.func.isRequired,
}

export default Controller