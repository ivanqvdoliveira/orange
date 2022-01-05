import React from 'react'
import { CustomHeader } from './styles'

const Header = () => {
  return (
    <CustomHeader>
      <div className='alert'>
        <span>2</span>
        <i className="fas fa-bell" />
      </div>
      <div className='avatar'>
        BD
      </div>
    </CustomHeader>
  )
}

export default Header