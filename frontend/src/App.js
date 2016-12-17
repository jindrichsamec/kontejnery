import React, { Component } from 'react'
import GoogleMap from 'google-map-react'
import { observable } from 'mobx';
import { observer } from 'mobx-react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import 'font-awesome/css/font-awesome.min.css'
import Container from './Container'
import SearchForm from './SearchForm'
import Center from './Center'

export default observer(class App extends Component {

  static defaultProps = {
    defaultCenter: {lat: 50.1197589, lng: 14.4673313},
    defaultZoom: 14,
    apiKey: 'AIzaSyC8NUe06Wy66Vf-4-tTIzobuGm4GXIdBDI',
  }

  obState = observable({
    center: null
  })

  _handleSearch = (when) => {
    console.info('Search', when);
  }

  _handleLocate = (lat, lng) => {
    this.obState.center = {lat, lng}
  }

  render() {
    const { defaultCenter, defaultZoom, apiKey } = this.props;
    const bootstrapURLKeys = {
      key: apiKey,
    };
    const { center } = this.obState;

    return (
      <div>
        <SearchForm onSearch={this._handleSearch} onLocate={this._handleLocate} />
        <div className="map">
          <GoogleMap
            bootstrapURLKeys={bootstrapURLKeys}
            defaultCenter={defaultCenter}
            defaultZoom={defaultZoom}
            center={center}>
            {center ? <Center {...center} /> : null}
            <Container />
          </GoogleMap>
        </div>
      </div>
    );
  }
})