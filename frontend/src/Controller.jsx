import React, { PropTypes } from 'react'
import SearchForm from './SearchForm'
import GeoLocateButton from './GeoLocateButton'

const Controller = ({ onSearch, onLocate }) => {

  return(
     <div className="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div className="container-fluid">
        <div className="navbar-header">
          <div className="navbar-icon-container">
            <a href="#" className="navbar-icon pull-right visible-xs" id="nav-btn"><i className="fa fa-bars fa-lg white"></i></a>
            <a href="#" className="navbar-icon pull-right visible-xs" id="sidebar-toggle-btn"><i className="fa fa-search fa-lg white"></i></a>
          </div>
          <a className="navbar-brand" href="#">Velkoobjemáky</a>
        </div>
        <div className="navbar-collapse">
          <form className="navbar-form navbar-right" role="search">
            <SearchForm onSearch={onSearch}/>
            <GeoLocateButton onLocate={onLocate}/>
          </form>
          <ul className="nav navbar-nav">
            <li><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" id="about-btn"><i className="fa fa-question-circle white"></i>&nbsp;&nbsp;About</a></li>
            <li className="hidden-xs"><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" id="list-btn"><i className="fa fa-list white"></i>&nbsp;&nbsp;POI List</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

Controller.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onLocate: PropTypes.func.isRequired,
}

export default Controller
