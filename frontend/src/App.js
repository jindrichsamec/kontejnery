import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import './App.css';
import Container from './Container'
import SearchForm from './SearchForm';

export default class App extends Component {

  static defaultProps = {
    defaultCenter: {lat: 50.1197589, lng: 14.4673313},
    defaultZoom: 14,
    apiKey: 'AIzaSyC8NUe06Wy66Vf-4-tTIzobuGm4GXIdBDI',
  }

  _handleSearch = (when) => {
    console.info('Search', when);
  }

  _handleLocate = () => {
    console.info('Locate...');
  }

  render() {
    const { defaultCenter, defaultZoom, apiKey } = this.props;
    const bootstrapURLKeys = {
      key: apiKey,
    };

    return (
      <div>
        <SearchForm onSearch={this._handleSearch} onLocate={this._handleLocate} />
        <div className="map">
          <GoogleMap
            bootstrapURLKeys={bootstrapURLKeys}
            defaultCenter={defaultCenter}
            defaultZoom={defaultZoom} >
            <Container />
          </GoogleMap>
        </div>
      </div>
    );
  }
}
