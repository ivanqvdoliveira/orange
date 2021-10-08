import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/home'
import Menu from './components/menu'

const DefaultRoute = () => {
  const [showResults, setShowResults] = useState(true)

  const handleClick = () => {

    setShowResults(!showResults)
  }

  
  return (
    <Router>
      <div className='full-height'>
        <Menu handleClick={handleClick} showResults={showResults} />

        <Route exact path="/" component={(props) => <Home {...props} showResults={showResults} />} />
      </div>
    </Router>
  )
}

export default DefaultRoute

