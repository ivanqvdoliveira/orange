import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home'
import Menu from './components/Menu'
import Enquete from './components/Enquete'
import Formulario from './components/Formulario'

const DefaultRoute = () => {
  const [showResults, setShowResults] = useState(true)

  const handleClick = () => {

    setShowResults(!showResults)
  }

  const { pathname } = window.location
  const url = pathname.split('/')

  return (
    <Router>
      <div className='full-height'>
        <Menu handleClick={handleClick} showResults={showResults} url={url[1]} />

        <Route exact path="/" component={() => <Home />} />
        <Route exact path="/enquete" component={(props) => <Enquete {...props} showResults={showResults} />} />
        <Route exact path="/formulario" component={(props) => <Formulario />} />
      </div>
    </Router>
  )
}

export default DefaultRoute

