import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import Icon from './Icon'
import Spinner from './Spinner'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

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
    const { disabled } = this.obsState
    // <Button type="button" bsStyle="success" onClick={this._handleClick}>
    return (
      <div style={{ position: 'fixed', bottom: '10px', right: '10px', zIndex: '1' }}>
        <Button onClick={this._handleClick} disabled={disabled} variant="fab" color="primary" aria-label="add">
          <Icon name="location-arrow" />
        </Button>
        {disabled && <CircularProgress size={68} style={{position: 'absolute', top: -6, left: -6, zIndex: 1}}/>}
      </div>
    )
  }
})
