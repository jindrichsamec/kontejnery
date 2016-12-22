import React, { PropTypes, Component } from 'react'
import 'whatwg-fetch'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { FormGroup, FormControl, Button } from 'react-bootstrap'
import Icon from './Icon'
import { interval, convertIntervalToDates } from './utils/DateInterval'

export default observer(class SearchForm extends Component {

  static propTypes = {
    onSearch: PropTypes.func.isRequired
  }

  obsState = observable({
    searching: false
  })

  _dateToString = (date) => {
    if (date === null) {
      return ''
    }
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }

  _getListUrl = (from, to) => {
    return 'http://localhost:5000/api/list?from=%FROM%&to=%TO%'
      .replace('%FROM%', this._dateToString(from))
      .replace('%TO%', this._dateToString(to));
  }

  _handleFormChange = (e) => {
    this.obsState.searching = true
    const { from, to } = convertIntervalToDates(this.dateInterval.value)
    const url = this._getListUrl(from, to)
    fetch(url).then(this._handleSuccess, this._handleFail)
  }

  _handleSuccess = (response) => {
    this.obsState.searching = false
    this.props.onSearch(response.json());
  }

  _handleFail = (response) => {
    this.obsState.searching = false
    console.error('Error during request');
  }

  render() {
    return(
      <FormGroup>
        <FormControl componentClass="select" placeholder="Select one..." inputRef={ref => this.dateInterval = ref} onChange={this._handleFormChange.bind(this)}>
          <option value={interval.TODAY}>Dnes</option>
          <option value={interval.TOMORROW}>Zítra</option>
          <option value={interval.THIS_WEEK}>Tento týden</option>
          <option value={interval.NEXT_WEEK}>Příští týden</option>
          <option value={interval.THIS_MONTH}>Tento měsíc</option>
          <option value={interval.ALL}>Vše</option>
        </FormControl>
        <Button type="button" bsStyle="primary" onClick={this._handleFormChange.bind(this)} disabled={this.obsState.searching}>
          <Icon name={this.obsState.searching ? 'circle-o-notch' : 'search'} />
        </Button>
      </FormGroup>
    )
  }

})
