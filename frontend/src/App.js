import React, { Component } from 'react'
import GoogleMap from 'google-map-react'
import cluster from 'points-cluster';
import { extendObservable, action } from 'mobx'
import { observer } from 'mobx-react'
import { Route } from 'react-router-dom'
import Omnibox from './Omnibox/Omnibox'
import Center from './Center'
import ContainerDetail from './ContainerDetail'
import Footer from './ui/Footer'
import Icon from './Icon'
import MapWrapper from './ui/MapWrapper'
import Alert from './ui/Alert'
import Container from './Container'
import GeoLocateButton from './GeoLocateButton'

import Marker from './ui/map/Marker'

export default observer(class App extends Component {

  static defaultProps = {
    defaultCenter: {lat: 50.1197589, lng: 14.4673313},
    defaultZoom: 13,
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  }

  constructor(props) {
    super(props)

    extendObservable(this, {
      containers: [],
      center: null,
      zoom: 13,
      bounds: null,
    })

    this.initialized = false
  }

  handleSearch = (data) => {
    this.initialized = true
    this.containers = data
  }

  handleLocate = action((lat, lng) => {
    this.center = {lat, lng}
    this.zoom = 15
  })

  handleMapChange = action((change) => {
    this.bounds = change.marginBounds
    this.zoom = change.zoom
  })

  handleContainerClick = (slug, name) => {
    const { history } = this.props
    history.push(`/kontejner/${slug}`, {name});
  }

  handleMarkerClustererClick = () => (markerClusterer) => {
    const clickedMarkers = markerClusterer.getMarkers()
    console.log(`Current clicked markers length: ${clickedMarkers.length}`)
    console.log(clickedMarkers)
  }

  canShowAlert() {
    return (this.containers.length === 0 && this.initialized)
  }

  renderNoContainerAlert() {
    return <Alert>
      Ve zvoleném termínu nejsou přistaveny žádné kontejnery :(
    </Alert>
  }

  renderPoint = (point) => {
    return <Marker key={point.id} {...point}>P</Marker>
  }

  renderCluster = (cluster) => {
    return <Marker key={cluster.id} {...cluster}>{cluster.numPoints}</Marker>
  }

  renderMapPoint = (point) => {
    return point.numPoints > 1 ? this.renderCluster(point) : this.renderPoint(point)
  }

  render() {
    const { defaultCenter, defaultZoom, apiKey } = this.props;

    const bootstrapURLKeys = {
      key: apiKey,
    };

    const getCluster = cluster(
      this.containers.map(c => c.coordinates),
      {
        minZoom: 3,
        maxZoom: 16,
        radius: 40, // cluster radius in pixels
      }
    )

    let clusters = []
    if (this.bounds) {
      clusters = getCluster({ bounds: this.bounds, zoom: this.zoom }).map(({ wx, wy, numPoints }) => ({
        lat: wy,
        lng: wx,
        text: numPoints,
        numPoints,
        id: `${numPoints}_${wy}_${wx}`,
      }));
    }

    return (
      <span>
        <Omnibox onSearch={this.handleSearch}  />
        {this.canShowAlert() && this.renderNoContainerAlert()}

        <GeoLocateButton onLocate={this.handleLocate} />
        <MapWrapper>
          <GoogleMap
            bootstrapURLKeys={bootstrapURLKeys}
            defaultCenter={defaultCenter}
            defaultZoom={defaultZoom}
            hoverDistance={24}
            zoom={this.zoom}
            center={this.center}
            onChange={this.handleMapChange}>

            {this.center && <Center {...this.center} />}
            {clusters.map(p => this.renderMapPoint(p))}
          </GoogleMap>
          <Route path="/kontejner/:slug" component={ContainerDetail} />

          <Footer>
            <span className="hidden-xs">
              S <Icon name="heart" /> vytvořil <a href="https://www.xjs.cz" title="Jinřich Samec">Jindřich Samec</a>.
              Díky za každé <a href="https://www.xjs.cz/#contact" title="Jindřich Samec - kontakt">nahlášení chyby</a>.
            </span>
          </Footer>

        </MapWrapper>
      </span>
    );
  }
})
