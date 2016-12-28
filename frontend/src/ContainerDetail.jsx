import React, { Component, PropTypes } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import Icon from './Icon'
import { formatInterval } from './utils/DateInterval'

export default observer(class ContainerDetail extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired
  }

  obState = observable({
    detailInfo: null
  })

  componentDidMount() {
    fetch(`http://localhost:3000/api/${this.props.id}`).then(this.handleSuccess, this.handleFail)
  }

  normalizeData = (data) => {
    const terms = data.terms.map((item) => {
      return {
        ...item,
        datetime_from: new Date(item.datetime_from),
        datetime_to: new Date(item.datetime_to)
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
    return <ul>{info.terms.map(term => <li key={term.id}>{formatInterval(term.datetime_from, term.datetime_to)}</li>)}</ul>
  }

  render() {
    const { detailInfo } = this.obState
    return (<div>
      {detailInfo === null ? <Icon name="circle-o-notch" /> : this.renderDetailInfo(detailInfo)}
    </div>);
  }

})
