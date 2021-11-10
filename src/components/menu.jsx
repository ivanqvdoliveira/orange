import React, { useState, useEffect } from 'react';
import { StyledMenu, StyledButton } from './styles'

const Menu = (props) => {
  const { handleClick, showResults, url } = props
  const [showMsg, setShowMsg] = useState('')

  const onClickItem = () => {
    handleClick()
  }

  useEffect(() => {
    let msg = 'Residencial Louvre'
    if (url === 'enquete') {
      msg = 'Enquete Residencial Louvre'
    }

    setShowMsg(msg)
  }, [setShowMsg, url])

  return (
    <StyledMenu>
      <span>{showMsg}</span>

      {url === 'enquete' && (
        <StyledButton onClick={() => onClickItem()}>
          {showResults ? 'Formulário' : 'Ver resultados'}
        </StyledButton>
      )}

      {url !== '' && (
        <StyledButton onClick={() => window.location = '/'}>
          Voltar
        </StyledButton>
      )}

    </StyledMenu>
  )
}

export default Menu