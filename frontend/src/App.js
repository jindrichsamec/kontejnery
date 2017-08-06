import React, { Component } from 'react'
import GoogleMap from 'google-map-react'
import { observable } from 'mobx';
import { observer } from 'mobx-react'
import { Route } from 'react-router-dom';
import Container from './Container'
import Omnibox from './Omnibox/Omnibox'
import Center from './Center'
import ContainerDetail from './ContainerDetail'
import Footer from './ui/Footer'
import Icon from './Icon'
import MapWrapper from './ui/MapWrapper'
import Alert from './ui/Alert'

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

  constructor(props) {
    super(props)
    this.initialized = false
  }

  handleSearch = (data) => {
    this.initialized = true
    this.model.containers = data
  }

  handleLocate = (lat, lng) => {
    this.model.center = {lat, lng}
  }

  handleContainerClick = (slug, name) => {
    const { history } = this.props
    history.push(`/kontejner/${slug}`, {name});
  }

  canShowAlert() {
    return (this.model.containers.length === 0 && this.initialized)
  }

  renderNoContainerAlert() {
    return <Alert>
      Ve zvoleném termínu nejsou přistaveny žádné kontejnery :(
    </Alert>
  }

  render() {
    const { defaultCenter, defaultZoom, apiKey } = this.props;
    const { center, containers } = this.model;
    const bootstrapURLKeys = {
      key: apiKey,
    };

    return (
      <span>
        <Omnibox onSearch={this.handleSearch} onLocate={this.handleLocate} />
        {this.canShowAlert() && this.renderNoContainerAlert()}
        <MapWrapper>
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
          <Footer>
            <span className="hidden-xs">
              S <Icon name="heart" /> vytvořil <a href="https://www.xjs.cz" title="Jinřich Samec">Jindřich Samec</a>.
              Díky za každé <a href="https://www.xjs.cz/#contact" title="Jindřich Samec - kontakt">nahlášení chyby</a>.
            </span>
            <span className="visible-xs-inline">
              S <Icon name="heart" /> vytvořil <a href="https://www.xjs.cz" title="Jinřich Samec">JS</a>.
            </span>
          </Footer>
        </MapWrapper>
      </span>
    );
  }
})
