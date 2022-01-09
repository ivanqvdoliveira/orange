import React, { useState } from 'react'
import { RequestDelete } from '../../utils/requests'
import DefaultModalConfirm from '../../utils/modalTypes/DefaultModalConfirm'
import DefaultModalAlert from  '../../utils/modalTypes/DefaultModalAlert'
import {
  TableContainer,
  RowTable,
  HeaderTable,
  ColTable,
} from './styles'

const RegisterClient = (props) => {
  const {
    listToShow,
    setListToShow,
    isMobile,
    onEditNameClick,
  } = props

  const [sortAsc, setSortAsc] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [itemToDelete, setItemToDelete] = useState('')

  const removeSuccess = () => {
    setShowModal(true)
    setModalType('remove-success')
    setItemToDelete('')
  }

  const onRemoveItemClick = (id) => {
    setShowModal(true)
    setModalType('')
    setItemToDelete(id)
  }

  const renderNamesList = (item) => {
    return (
      <RowTable key={item.id}>
        <ColTable>
          {isMobile && (
            <span onClick={() => onSortClick('id')}>
              ID
            </span>
          )}
          <p onClick={() => onEditNameClick(item.id, item.nome)}>
            {item.index}
          </p>
        </ColTable>
        <ColTable>
          {isMobile && (
            <span onClick={() => onSortClick('name')}>
              Nome
            </span>
          )}
          <p onClick={() => onEditNameClick(item.id, item.nome)}>
            {item.nome}
          </p>
        </ColTable>
        <ColTable>
          <i onClick={() => onRemoveItemClick(item.id)} className="far fa-trash-alt" />
        </ColTable>
      </RowTable>
    )
  }

  const onSortClick = (item) => {
    const newList = [...listToShow]
    let sortBy = 'id'

    if (item === 'name') {
      sortBy = 'nome'
    }

    newList.sort((a, b) => {
      if (a[sortBy] > b[sortBy]) {
        return !sortAsc ? 1 : -1
      }
      if (a[sortBy] < b[sortBy]) {
        return !sortAsc ? -1 : 1
      }

      return 0
    })

    setSortAsc(!sortAsc)
    setListToShow(newList)
  }

  const onCloseModal = () => {
    setShowModal(false)
    setModalType('')
  }

  const confirmRemoveItem = () => {
    RequestDelete(itemToDelete, removeSuccess)
  }

  const renderModal = () => {
    if (modalType === 'remove-success') {
      return <DefaultModalAlert
        closeModal={onCloseModal}
        msg='Nome removido com sucesso.'
      />
    }

    return (
      <DefaultModalConfirm
        msg='Deseja mesmo remover o item?'
        closeModal={onCloseModal}
        callBack={confirmRemoveItem}
      />
    )
  }

  return (
    <>
      {showModal && renderModal()}

      <TableContainer>
        {!isMobile && (
          <HeaderTable>
            <ColTable>
              ID
              <i
                onClick={() => onSortClick('id')}
                className="fas fa-sort"
              />
            </ColTable>
            <ColTable>
              NOME
              <i
                onClick={() => onSortClick('name')}
                className="fas fa-sort"
              />
            </ColTable>
            <ColTable />
          </HeaderTable>
        )}

        {listToShow.map((item) => renderNamesList(item))}

        <span className='clear' />
      </TableContainer>
    </>
  )
}

export default RegisterClient