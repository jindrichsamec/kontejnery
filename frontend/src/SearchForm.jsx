import React, { PropTypes, Component } from 'react'
import 'whatwg-fetch'
import { FormGroup, FormControl, Button } from 'react-bootstrap'
import Icon from './Icon'

export default class SearchForm extends Component {

  static propTypes = {
    onSearch: PropTypes.func.isRequired
  }

  _dateToString = (date) => {
    return date.toISOString().slice(0, 10)
  }

  _getListUrl = (from, to) => {
    return 'http://localhost:5000/api/list?from=%FROM%&to=%TO%'
      .replace('%FROM%', this._dateToString(from))
      .replace('%TO%', this._dateToString(to));
  }

  _handleClick = (e) => {
    const from = new Date()
    const to = new Date()
    const url = this._getListUrl(from, to)
    fetch(url).then(this._handleSuccess, this._handleFail)
  }

  _handleSuccess = (response) => {
    this.props.onSearch(response.json());
  }

  _handleFail = (response) => {
    console.error('Error during request');
  }

  render() {
    return(
      <FormGroup>
        <FormControl componentClass="select" placeholder="Select one...">
          <option value="today">Dnes</option>
          <option value="tomorrow">Zítra</option>
          <option value="thisweek">Tento týden</option>
          <option value="nextweek">Příští týden</option>
          <option value="all">Vše</option>
        </FormControl>
        <Button type="button" bsStyle="primary" onClick={this._handleClick}>
          <Icon name="search" /> Search
        </Button>
      </FormGroup>
    )
  }

}
