import React, { Component } from 'react'
import GoogleMap from 'google-map-react'
import { observable } from 'mobx';
import { observer } from 'mobx-react'
import { Route } from 'react-router-dom';
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
    center: null
  });

  handleSearch = (data) => {
    this.model.containers = data
  }

  handleLocate = (lat, lng) => {
    this.model.center = {lat, lng}
  }

  handleContainerClick = (slug, name) => {
    const { history } = this.props
    history.push(`/kontejner/${slug}`, {name});
  }

  render() {
    const { defaultCenter, defaultZoom, apiKey } = this.props;
    const { center, containers } = this.model;
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
                    key={container.slug}
                    onClick={this.handleContainerClick} />)
              })}
            </GoogleMap>
            <Route path="/kontejner/:slug" component={ContainerDetail} />
          </div>
        </div>
      </span>
    );
  }
})
