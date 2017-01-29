import React, { PropTypes, Component } from 'react'
import 'whatwg-fetch'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { FormGroup, FormControl, Button, InputGroup } from 'react-bootstrap'
import Icon from './Icon'
import { interval, convertIntervalToDates } from './utils/DateInterval'

export default observer(class SearchForm extends Component {

  static propTypes = {
    onSearch: PropTypes.func.isRequired
  }

  intervalLabels = {
    [interval.TODAY]: 'Dnes',
    [interval.TOMORROW]: 'Zítra',
    [interval.THIS_WEEK]: 'Tento týden',
    [interval.NEXT_WEEK]: 'Příští týden',
    [interval.THIS_MONTH]: 'Tento měsíc',
  }

  obState = observable({
    searching: false,
    dateInterval: interval.THIS_WEEK
  });

  componentDidMount = () => {
    this._doSearch(this.obState.dateInterval)
  }

  _dateToString = (date) => {
    if (date === null) {
      return ''
    }
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }

  _getListUrl = (from, to) => {
    return `${process.env.REACT_APP_API_HOST}/api/list?date_from=%FROM%&date_to=%TO%`
      .replace('%FROM%', this._dateToString(from))
      .replace('%TO%', this._dateToString(to));
  }

  _handleFormChange = (e) => {
    this.obState.searching = true
    this._doSearch(this.selection.value)
  }

  _doSearch(interval) {
    const { from, to } = convertIntervalToDates(interval)
    const url = this._getListUrl(from, to)
    fetch(url).then(this._handleSuccess, this._handleFail)
  }

  _handleSuccess = (response) => {
    this.obState.searching = false
    response.json().then(json => this.props.onSearch(json.data));
  }

  _handleFail = (response) => {
    this.obState.searching = false
    console.error('Error during request');
  }

  _getLabel(interval) {
    return this.intervalLabels[interval];
  }

  render() {
    return(
      <FormGroup>
        <InputGroup>
          <FormControl
            componentClass="select"
            placeholder="Select one..."
            ref='intervalSelect'
            inputRef={ref => this.selection = ref}
            onChange={this._handleFormChange}
            defaultValue={this.obState.dateInterval}>
            {Object.keys(this.intervalLabels).map((i) => <option key={i} value={i}>{this._getLabel(i)}</option>)}
          </FormControl>
          <InputGroup.Button>
            <Button type="button" bsStyle="primary" onClick={this._handleFormChange} disabled={this.obState.searching}>
              <Icon name={this.obState.searching ? 'circle-o-notch' : 'search'} />
            </Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    )
  }

})
