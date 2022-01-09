import React, { useState, useEffect } from 'react'
import RegisterClient from './table/RegisterClient'
import { getItemsList, AddNewItem, RequestUpdateItem } from '../utils/requests'
import Modal from '../utils/Modal'
import  {
  CustomTitle,
  StyledSearch,
  StyledButtonAdd,
  CustomModal,
} from './styles'

const setupModal = {
  status: false,
  success: true,
}

const Home = (props) => {
  const { isMobile } = props

  const [fullList, setFullList] = useState([])
  const [listToShow, setListToShow] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [toEdit, setToEdit] = useState({})
  const [modalTypeDefault, setModalTypeDefault] = useState(setupModal)
  const [form, setForm] = useState({})

  useEffect(() => {
    getItemsList(setListToShow, setFullList)
  }, [])

  const closeModal = () => {
    setShowModal(false)
    setModalTypeDefault(setupModal)
    setShowEditModal(false)
  }

  const onSuccess = () => {
    setModalTypeDefault({
      status: true,
      success: true,
    })
    setForm({})
    setShowModal(true)
    setShowEditModal(false)
  }

  const onError = () => (
    setModalTypeDefault({
      status: true,
      success: false,
    })
  )

  const onSendClick = () => (
    AddNewItem({nome: form.nome}, onSuccess, onError)
  )

  const onFormChange = (e) => {
    const { name, value } = e.target

    if (name === 'search' && Boolean(!value)) {
      setListToShow(fullList)
    }

    const newForm = {
      ...form,
      [name]: value
    }
    setForm(newForm)
  }

  const onEditFormChange = (e) => {
    const { value } = e.target
    const newForm = {
      ...toEdit,
      nome: value
    }

    setToEdit(newForm)
  }

  const renderNeWClientModal = () => (
    <Modal closeModal={closeModal}>
      <CustomModal>
        <h4>Digite o nome do cliente</h4>
        <input
          className="input"
          type="text"
          name="nome"
          value={form.nome}
          onChange={onFormChange}
        />
        <button
          className="button"
          onClick={onSendClick}
        >
          Enviar
        </button>
      </CustomModal>
    </Modal>
  )

  const onNewContactClick = () => (
    setShowModal(true)
  )

  const renderModal = () => (
    <Modal closeModal={closeModal}>
      <CustomModal>
        <h4>
          {modalTypeDefault.success ? 'Cadastro realizado com sucesso': 'opa, ocorreu um erro, tente novamente.'}
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

  const onSearchClick = () => {
    const newList = [...fullList]
    const results = newList.filter((item) => {
      return item.nome.toLowerCase().startsWith(form.search.toLowerCase())
    })

    setListToShow(results)
  }

  const handleChangeSubmit = () => {
    const { id, nome} = toEdit
    RequestUpdateItem(id, { nome }, onSuccess)
  }

  const renderEditModal = () => (
    <Modal closeModal={closeModal}>
      <CustomModal>
        <h4>Altere o nome do cliente</h4>
        <input
          className="input"
          type="text"
          name="nome"
          value={toEdit.nome}
          onChange={onEditFormChange}
        />
        <button
          className="button"
          onClick={handleChangeSubmit}
        >
          Salvar
        </button>
      </CustomModal>
    </Modal>
  )

  const onEditNameClick = (id, nome) => {
    setShowEditModal(true)
    setToEdit({
      nome,
      id
    })
  }

  return (
    <>
      {showModal && (
        modalTypeDefault.status? renderModal() : renderNeWClientModal()
      )}
      {showEditModal && (
        renderEditModal()
      )}
      <CustomTitle>
        CRUD Exemplo
      </CustomTitle>

      <section>
        <StyledSearch>
          <input
            type="search"
            name="search"
            onChange={onFormChange}
          />
          <i
            onClick={onSearchClick}
            className="fas fa-search"
          />
        </StyledSearch>

        <StyledButtonAdd onClick={onNewContactClick}>
          Novo
          <i className="fas fa-plus"></i>
        </StyledButtonAdd>
      </section>

      <section>
        <RegisterClient
          listToShow={listToShow}
          setListToShow={setListToShow}
          isMobile={isMobile}
          onEditNameClick={onEditNameClick}
        />
      </section>
    </>

  )
}

export default Home
