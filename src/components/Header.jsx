import React from 'react';
import logo from '../img/logo.svg'

const Header = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <h1 className='App-title'>Base React - Ivan Oliveira</h1>
      </header>
    </div>
  )
}

export default Header