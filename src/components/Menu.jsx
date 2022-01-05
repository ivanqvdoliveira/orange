import React from 'react';
import { NavLink } from 'react-router-dom'
import { StyledMenu, ImageLogo, CustomButton } from './styles'

const Menu = (props) => {
  const {
    showMenu,
    setShowMenu,
    isMobile,
  } = props

  return (
    <>
      {showMenu ? (
        <StyledMenu>
          <i className="fas fa-times-circle" onClick={() => setShowMenu(false)}/>
          <ImageLogo src='https://orangeconsulting.com.br/wp-content/uploads/2021/09/Logo-Orange_ORIGINAL_header_novo-2.png' alt='logo' />
          <ul>
            <li>
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className={isMobile ? '' : 'desktop-menu'}
                onClick={() => isMobile && setShowMenu(false)}
              >
                <span className='barBG' />
                <span>
                  <i className="fas fa-home" />
                  Home
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                activeClassName="active"
                className={isMobile ? '' : 'desktop-menu'}
                onClick={() => isMobile && setShowMenu(false)}
              >
                <span className='barBG' />
                <span>
                  <i className="fas fa-chart-line" />
                  Dashboard
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/administration"
                activeClassName="active"
                className={isMobile ? '' : 'desktop-menu'}
                onClick={() => isMobile && setShowMenu(false)}
              >
                <span className='barBG' />
                <span>
                  <i className="fas fa-cog" />
                  Administração
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tools"
                activeClassName="active"
                className={isMobile ? '' : 'desktop-menu'}
                onClick={() => isMobile && setShowMenu(false)}
              >
                <span className='barBG' />
                <span>
                  <i className="fas fa-cog" />
                  Configuração
                </span>
              </NavLink>
            </li>
          </ul>
          <span className='clear' />
        </StyledMenu>
      ) : (
        <CustomButton type='button' onClick={() => setShowMenu(true)}>
          <i className="fas fa-bars" />
        </CustomButton>
      )}
      <span className='clear' />
    </>
  )
}

export default Menu