import React from 'react'
import { render } from 'react-dom'
import { Router, Route } from 'react-router-dom'
import App from './App'
import { createGaHistroy } from './ga'
import './index.css'

render((
  <Router history={createGaHistroy()}>
    <Route path="/" component={App} />
  </Router>
), document.getElementById('app'))
