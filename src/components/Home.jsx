import React, { useState, useEffect } from 'react'
import RegisterClient from './table/RegisterClient'
import { getItemsList, AddNewItem, RequestUpdateItem } from '../utils/requests'
import DefaultModalSubmit from  '../utils/modalTypes/DefaultModalSubmit'
import DefaultModalAlert from  '../utils/modalTypes/DefaultModalAlert'
import  {
  CustomTitle,
  StyledSearch,
  StyledButtonAdd,
} from './styles'

const OPTIONS = {
  msgRegisterSuccess: 'Cadastro realizado com sucesso',
  msgRegisterError: 'Opa, ocorreu um erro, tente novamente.',
  msgFillName: 'Digite o nome do cliente',
  msgEditName: 'Altere o nome do cliente'
}

const Home = (props) => {
  const { isMobile } = props

  const [fullList, setFullList] = useState([])
  const [listToShow, setListToShow] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [toEdit, setToEdit] = useState({})
  const [modalType, setModalType] = useState('')
  const [form, setForm] = useState({})

  useEffect(() => {
    getItemsList(setListToShow, setFullList)
  }, [])

  const closeModal = () => {
    setShowModal(false)
    setModalType('')
  }

  const onSuccess = () => {
    setModalType('success')
    setShowModal(true)
    setForm({})
  }

  const onError = () => {
    setModalType('error')
    setShowModal(true)
  }

  const onNewContactClick = () => {
    setModalType('new-client')
    setShowModal(true)
  }

  const onEditNameClick = (id, nome) => {
    setModalType('edit-client')
    setShowModal(true)
    setToEdit({
      nome,
      id
    })
  }

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

  const renderModal = () => {
    switch (modalType) {
      case 'success':
        return <DefaultModalAlert
          closeModal={closeModal}
          msg={OPTIONS.msgRegisterSuccess}
        />

      case 'error':
        return <DefaultModalAlert
        closeModal={closeModal}
        msg={OPTIONS.msgRegisterError}
      />

      case 'new-client':
        return <DefaultModalSubmit
          closeModal={closeModal}
          msg={OPTIONS.msgFillName}
          onChange={onFormChange}
          value={form.nome}
          onSubmit={onSendClick}
          name='nome'
          buttonLabel='Enviar'
        />

      case 'edit-client':
        return <DefaultModalSubmit
          closeModal={closeModal}
          msg={OPTIONS.msgEditName}
          onChange={onEditFormChange}
          value={toEdit.nome}
          onSubmit={handleSubmit}
          name='nome'
          buttonLabel='Salvar'
        />

      default:
        return null
    }
  }

  const onSearchClick = () => {
    const newList = [...fullList]
    const results = newList.filter((item) => {
      return item.nome.toLowerCase().startsWith(form.search.toLowerCase())
    })

    setListToShow(results)
  }

  const handleSubmit = () => {
    const { id, nome} = toEdit
    RequestUpdateItem(id, { nome }, onSuccess)
  }

  return (
    <>
      {showModal && renderModal()}
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
