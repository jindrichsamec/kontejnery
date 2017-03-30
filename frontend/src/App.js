import React, { Component } from 'react'
import GoogleMap from 'google-map-react'
import { observable } from 'mobx';
import { observer } from 'mobx-react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import Container from './Container'
import Controller from './Controller'
import Center from './Center'
import ContainerDetail from './ContainerDetail'

export default observer(class App extends Component {

  static defaultProps = {
    defaultCenter: {lat: 50.1197589, lng: 14.4673313},
    defaultZoom: 13,
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  }

  model = observable({
    containers: [],
    center: null,
    selectedContainer: null
  });

  handleSearch = (data) => {
    this.model.containers = data
  }

  handleLocate = (lat, lng) => {
    this.model.center = {lat, lng}
  }

  handleContainerClick = (id, name) => {
    this.model.selectedContainer = {id, name}
  }

  handleCloseDetail = () => {
    this.model.selectedContainer = null;
  }

  render() {
    const { defaultCenter, defaultZoom, apiKey } = this.props;
    const { center, containers, selectedContainer } = this.model;
    const bootstrapURLKeys = {
      key: apiKey,
    };

    return (
      <span>
        <Controller onSearch={this.handleSearch} onLocate={this.handleLocate} />
        <div id="container">
          <div id="map">
            <GoogleMap
              bootstrapURLKeys={bootstrapURLKeys}
              defaultCenter={defaultCenter}
              defaultZoom={defaultZoom}
              hoverDistance={24}
              center={center}>

              {center && <Center {...center} />}
              {containers.map((container) => {
                return (<Container
                  {...container}
                  {...container.coordinates}
                  key={container.id}
                  onClick={this.handleContainerClick} />)
              })}
              {selectedContainer && <ContainerDetail {...selectedContainer} onClose={this.handleCloseDetail} />}
            </GoogleMap>
          </div>
        </div>
      </span>
    );
  }
})
