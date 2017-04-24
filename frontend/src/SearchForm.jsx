import React, { PropTypes, Component } from 'react'
import 'whatwg-fetch'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { MenuItem, DropdownButton } from 'react-bootstrap'
import { interval, convertIntervalToDates } from './utils/DateInterval'
import SearchQuery from './model/SearchQuery'

export default observer(class SearchForm extends Component {

  static propTypes = {
    onSearch: PropTypes.func.isRequired
  }

  intervalLabels = {
    [interval.TODAY]: 'Dnes',
    [interval.TOMORROW]: 'Zítra',
    [interval.NEXT_SEVEN_DAYS]: 'Příštích 7 dní',
    [interval.THIS_MONTH]: 'Tento měsíc',
  }

  obState = observable({
    searching: false,
    dateInterval: interval.NEXT_SEVEN_DAYS,
  });

  componentDidMount = () => {
    this.doSearch(this.obState.dateInterval)
  }

  dateToString = (date) => {
    if (date === null) {
      return ''
    }
    return date.toISOString();
  }

  getListEndpointUrl = (since, till) => {
    return `${process.env.REACT_APP_API_HOST}/api/list?since=%SINCE%&till=%TILL%`
      .replace('%SINCE%', this.dateToString(since))
      .replace('%TILL%', this.dateToString(till));
  }

  handleClick = (value) => {
    this.obState.dateInterval = value
    this.obState.searching = true
    this.doSearch(value)
  }

  doSearch(interval) {
    const {since, till} = convertIntervalToDates(interval)
    SearchQuery.since = since;
    SearchQuery.till = till;
    const url = this.getListEndpointUrl(since, till)
    fetch(url).then(this.handleSuccess, this.handleFail)
  }

  handleSuccess = (response) => {
    this.obState.searching = false

    response.json().then(this.normalizeData)
      .then(data => this.props.onSearch(data));
  }

  normalizeData(json) {
    const data = json.data.map((item) => {
      const till = new Date(item.till);
      return {...item, till}
    });
    const slugs = []

    return data.filter((item) => {
      const included = (slugs.indexOf(item.slug) > -1)
      slugs.push(item.slug)
      return !included;
    });
  }

  handleFail = (response) => {
    this.obState.searching = false
    console.error('Error during request');
  }

  getLabel(interval) {
    return this.intervalLabels[interval];
  }

  renderMenu =(value, index) => {
    return <MenuItem key={index} onClick={() => this.handleClick(value)}>{this.getLabel(value)}</MenuItem>
  }

  render() {
    return(
      <DropdownButton bsSize="large" title={this.getLabel(this.obState.dateInterval)} id="search-form">
        {Object.keys(this.intervalLabels).map(this.renderMenu)}
      </DropdownButton>
    )
  }

})
