import React from 'react'
import Modal from '../Modal'
import { CustomModal } from './styles'

const DefaultModalAlert = (props) => {
  const {
    closeModal,
    msg,
  } = props

  return (
    <Modal closeModal={closeModal}>
      <CustomModal>
        <h4>
          {msg}
        </h4>
        <button
          className="button"
          onClick={closeModal}
        >
          Ok
        </button>
      </CustomModal>
    </Modal>
  )
}

export default DefaultModalAlert
