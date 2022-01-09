import React from 'react'
import Modal from '../Modal'
import { CustomModal } from './styles'

const DefaultModalConfirm = (props) => {
  const {
    closeModal,
    msg,
    callBack,
  } = props

  return (
    <Modal closeModal={closeModal}>
      <CustomModal>
        <h4>{msg}</h4>
        <button className='button' onClick={closeModal}>
          Não
        </button>
        <button className='button' onClick={callBack}>
          Sim
        </button>
      </CustomModal>
    </Modal>
  )
}

export default DefaultModalConfirm
