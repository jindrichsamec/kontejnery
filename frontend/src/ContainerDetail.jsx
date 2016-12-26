import React, { Component, PropTypes } from 'react'
import { Popover } from 'react-bootstrap'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import Icon from './Icon'

export default observer(class ContainerDetail extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired
  }

  obState = observable({
    detailInfo: null
  })

  componentDidMount() {
    fetch(`http://localhost:3000/api/${this.props.id}`).then(this._handleSuccess, this._handleFail)
  }

  _handleSuccess = (response) => {
    response.json().then(json => this.setDetailInfo(json.data))
  }

  _handleFail = () => {
    console.error('Error during the request');
  }

  setDetailInfo = (info) => {
    this.obState.detailInfo = info
  }

  renderDetailInfo(info) {
    return <ul>{info.terms.map(term => <li key={term.id}>{term.datetime_from} - {term.datetime_to}</li>)}</ul>
  }

  render() {
    const { detailInfo } = this.obState
    return (<div>
      {detailInfo === null ? <Icon name="circle-o-notch" /> : this.renderDetailInfo(detailInfo)}
    </div>);
  }

})
