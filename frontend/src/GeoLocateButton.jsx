import React, { Component, PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import Icon from './Icon'

export default class GeoLocationButton extends Component {

  static propTypes = {
    onLocate: PropTypes.func.isRequired,
    onLocateFail: PropTypes.func
  }

  _handleSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    this.props.onLocate(latitude, longitude);
  }

  _handleFail = (error) => {
    if (typeof this.props.onLocateFail === 'function') {
      this.props.onLocateFail(error);
    } else {
      console.error(error);
    }
  }

  _handleClick = () => {
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

    return <Button type="button" bsStyle="success" onClick={this._handleClick}>
      <Icon name="location-arrow" /> Moje poloha
    </Button>
  }
}