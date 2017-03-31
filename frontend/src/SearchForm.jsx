import React, { PropTypes, Component } from 'react'
import 'whatwg-fetch'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { FormGroup, FormControl, Button, InputGroup } from 'react-bootstrap'
import Icon from './Icon'
import { interval, convertIntervalToDates } from './utils/DateInterval'
import SearchQuery from './model/SearchQuery'

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
    return date.toISOString();
  }

  _getListUrl = (since, till) => {
    return `${process.env.REACT_APP_API_HOST}/api/list?since=%SINCE%&till=%TILL%`
      .replace('%SINCE%', this._dateToString(since))
      .replace('%TILL%', this._dateToString(till));
  }

  _handleFormChange = (e) => {
    this.obState.searching = true
    this._doSearch(this.selection.value)
  }

  _doSearch(interval) {
    const {since, till} = convertIntervalToDates(interval)
    SearchQuery.since = since;
    SearchQuery.till = till;
    const url = this._getListUrl(since, till)
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
            <Button type="button" bsStyle="default" onClick={this._handleFormChange} disabled={this.obState.searching}>
              <Icon name={this.obState.searching ? 'circle-o-notch' : 'search'} />
            </Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    )
  }

})
