import React from 'react';
import { StyledMenu } from './styles'

const Menu = (props) => {
  const { handleClick } = props
  const onClickItem = () => {
    handleClick()
  }

  return (
    <StyledMenu>
      Enquete Residencial Louvre

      <button onClick={() => onClickItem()}>ok</button>
    </StyledMenu>
  )
}

export default Menu