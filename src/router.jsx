import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/home'
import Menu from './components/menu'

const defaultRoute = () => (
  <Router>
    <div className='full-height'>
      <Menu />

      <Route exact path="/" component={Home}/>
    </div>
  </Router>
)

export default defaultRoute

