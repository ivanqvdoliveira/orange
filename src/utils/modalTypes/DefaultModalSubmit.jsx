import React from 'react'
import Modal from '../Modal'
import { CustomModal } from './styles'

const DefaultModalSubmit = (props) => {
  const {
    closeModal,
    msg,
    onChange,
    value,
    onSubmit,
    name,
    buttonLabel,
  } = props

  return (
    <Modal closeModal={closeModal}>
      <CustomModal>
        <h4>{msg}</h4>
        <input
          className="input"
          type="text"
          name={name}
          value={value}
          onChange={onChange}
        />
        <button
          className="button"
          onClick={onSubmit}
        >
          {buttonLabel}
        </button>
      </CustomModal>
    </Modal>
  )
}

export default DefaultModalSubmit
