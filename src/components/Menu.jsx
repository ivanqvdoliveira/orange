import React from 'react';
import { Link } from 'react-router-dom'
import { StyledMenu, ImageLogo } from './styles'

const Menu = () => {
  return (
    <StyledMenu>

      <ImageLogo src='https://orangeconsulting.com.br/wp-content/uploads/2021/09/Logo-Orange_ORIGINAL_header_novo-2.png' alt='logo' />
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/exemples">Exemples</Link></li>
      </ul>
    </StyledMenu>
  )
}

export default Menu