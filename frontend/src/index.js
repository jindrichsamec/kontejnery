import React from 'react'
import { render } from 'react-dom'
import { Router, Route } from 'react-router-dom'
import App from './App'
import { createGaHistroy } from './ga'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './assets/fonts.css'
import './index.css'

render((
  <Router history={createGaHistroy()}>
    <Route path="/" component={App} />
  </Router>
), document.getElementById('app'))
