import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import Menu from './components/Menu'
import Contact from './components/Contact'
import Exemples from './components/Examples'

const defaultRoute = () => (
  <Router>
    <div>
      <Header />
      <Menu />

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/contact" component={Contact}/>
      <Route path="/exemples" component={Exemples}/>
    </div>
  </Router>
)

export default defaultRoute


