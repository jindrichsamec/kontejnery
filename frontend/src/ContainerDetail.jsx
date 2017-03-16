import React, { Component, PropTypes } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import Icon from './Icon'
import { formatInterval } from './utils/DateInterval'
import SearchQuery from './model/SearchQuery';

export default observer(class ContainerDetail extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired
  }

  obState = observable({
    detailInfo: null
  })

  componentDidMount() {
    const since = SearchQuery.since.toISOString();
    fetch(`${process.env.REACT_APP_API_HOST}/api/${this.props.id}?since=${since}`).then(this.handleSuccess, this.handleFail)
  }

  normalizeData = (data) => {
    const terms = data.terms.map((item) => {
      return {
        ...item,
        since: new Date(item.since),
        till: new Date(item.till)
      }
    })
    return {
      ...data,
      terms
    }
  }

  handleSuccess = (response) => {
    response.json().then(json => {
      const data = this.normalizeData(json.data)
      this.setDetailInfo(data)
    })
  }

  handleFail = () => {
    console.error('Error during the request');
  }

  setDetailInfo = (info) => {
    this.obState.detailInfo = info
  }

  renderDetailInfo(info) {
    return <ul>{info.terms.map(term => <li key={term.id}>{formatInterval(term.since, term.till)}</li>)}</ul>
  }

  render() {
    const { detailInfo } = this.obState
    return (<div>
      {detailInfo === null ? <Icon name="circle-o-notch" /> : this.renderDetailInfo(detailInfo)}
    </div>);
  }

})
