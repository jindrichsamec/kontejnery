import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'whatwg-fetch'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { interval, convertIntervalToDates } from '../utils/DateInterval'
import SearchQuery from '../model/SearchQuery'
import Spinner from '../Spinner'
import styled from 'styled-components'

const TermSelection = styled.a`
  line-height: 40px;
  margin: 0 8px;
  display: block;
  cursor: pointer;
  font-size: 1.2em;
  color: #000;

  &:after {
    font: normal normal normal 14px/1 FontAwesome;
    font-smoothing: antialiased;
    content: "\f107";
    position: absolute;
    right: 10px;
    display: inline-block;
    line-height: 40px;
  }
`

const TermSelect = styled.div`
  max-height: ${({open}) => open ? '200px' : '0'};
  overflow: hidden;
  transition: max-height 0.4s;
`

const Menu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`
const MenuItem = styled.a`
  padding: 5px 10px;
  margin: 0;
  display: block;
  line-height: 40px;

  &:hover {
    color: #fff;
    background: rgb(87,203,225);
    cursor: pointer;
  }
`

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
    showMenu: false
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
    this.obState.showMenu = false
    this.doSearch(value)
  }

  toggleMenu = () => {
    this.obState.showMenu = !this.obState.showMenu
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
    return <MenuItem key={index} onClick={() => this.handleClick(value)}>
      {this.getLabel(value)}
    </MenuItem>
  }

  render() {
    return(
      <div>
        <TermSelection onClick={this.toggleMenu}>
          {this.obState.showMenu ? 'Hledat kontejner na...' : this.getLabel(this.obState.dateInterval)}
          {this.obState.searching && <span style={{marginLeft:'10px'}}><Spinner /></span>}
        </TermSelection>
        <TermSelect open={this.obState.showMenu}>
          <Menu title={this.getLabel(this.obState.dateInterval)} id="search-form">
            {Object.keys(this.intervalLabels).map(this.renderMenu)}
          </Menu>
        </TermSelect>
      </div>
    )
  }

})
