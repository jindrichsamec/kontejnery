import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { Button } from 'react-bootstrap'
import Icon from './Icon'

export default observer(class GeoLocationButton extends Component {

  static propTypes = {
    onLocate: PropTypes.func.isRequired,
    onLocateFail: PropTypes.func
  }

  obsState = observable({
    disabled: false
  })

  _handleSuccess = (position) => {
    const { latitude, longitude } = position.coords
    this.props.onLocate(latitude, longitude)
    this.obsState.disabled = false
  }

  _handleFail = (error) => {
    if (typeof this.props.onLocateFail === 'function') {
      this.props.onLocateFail(error);
    } else {
      console.error(error);
    }
    this.obsState.disabled = false
  }

  _handleClick = () => {
    this.obsState.disabled = true
    navigator.geolocation.getCurrentPosition(this._handleSuccess, this._handleFail)
  }

  _isSupportedGeoLocation() {
    if (!navigator.geolocation) {
      console.warn('This browser doesnt support geolocation');
      return false;
    }
    return true;
  }

  render() {
    if (!this._isSupportedGeoLocation()) {
      return null;
    }

    return <Button type="button" bsStyle="success" onClick={this._handleClick} disabled={this.obsState.disabled}>
      <Icon name={this.obsState.disabled ? 'circle-o-notch' : 'location-arrow'} /> Moje poloha
    </Button>
  }
})
