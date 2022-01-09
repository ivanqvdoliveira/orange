import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import Menu from './components/Menu'
import Dashboard from './components/Dashboard'
import Administration from './components/Administration'
import Tools from './components/Tools'
import { CustomSection } from './styles/CustomSection'

const INNER_WIDTH_PARAM = 840

const DefaultRoute = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= INNER_WIDTH_PARAM)
  const [showMenu, setShowMenu] = useState(!isMobile)
  const [innerHeight, setInnerHeight] = useState(window.innerHeight)

  useEffect(() => {
    window.addEventListener('resize', () => {
      const widthW = window.innerWidth

      setInnerHeight(window.innerHeight)
      if (widthW <= INNER_WIDTH_PARAM) {
        setShowMenu(false)
        return setIsMobile(true)
      }
      
      setShowMenu(true)
      return setIsMobile(false)
    })
  }, [])

  return (
    <Router>
      <Menu
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        isMobile={isMobile}
      />
      <CustomSection
        className={!isMobile && 'desktop'}
        style={{ minHeight: innerHeight - 20 }}
      >
        <Header />

        <Route
          exact
          path="/"
          render={(props) => <Home {...props} isMobile={isMobile} /> }
        />
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/administration" component={Administration}/>
        <Route path="/tools" component={Tools}/>
      </CustomSection>
      <span className='clear' />
    </Router>
  )
}

export default DefaultRoute


