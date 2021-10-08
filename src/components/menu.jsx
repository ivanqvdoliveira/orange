import React from 'react';
import { StyledMenu, StyledButton } from './styles'

const Menu = (props) => {
  const { handleClick, showResults } = props
  const onClickItem = () => {
    handleClick()
  }

  return (
    <StyledMenu>
      <span>Enquete Residencial Louvre</span>

      <StyledButton onClick={() => onClickItem()}>
        {showResults ? 'Formulário' : 'Ver resultados'}
      </StyledButton>
    </StyledMenu>
  )
}

export default Menu