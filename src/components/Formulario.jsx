import React, { useState, useEffect } from 'react'
import {
  formatterPhone,
  formatterRestrictedCPF,
  formatterRestrictedEmail,
} from '../utils/formatter'
import firebase from 'firebase'
import firebaseConection from '../utils/firebase'
import Modal from '../utils/Modal'
import { APTOS } from '../constants/selectsFill'
import {
  StyledForm,
  StyledList,
  StyledBox,
} from './styles'

const DEFAULTS = {
  collection: 'cadastro-brigadista',
  typeError: 'error',
  typeSuccess: 'success',
  typeComplete: 'complete',
  typeHasAlready: 'alreadyExist'
}

const Formulario = () => {
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [showType, setShowType] = useState('')
  const [nameList, setNameList] = useState([])

  useEffect(() => {
    firebaseConection
    .firestore()
    .collection(DEFAULTS.collection)
    .onSnapshot(snapshot => {
      const morador = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setNameList(morador)
    })
  }, [setNameList])

  const onInputChange = (e) => {
    const { name, value } = e.target
    if (
      (name === 'phone' || name === 'document') && value.length >= 12
    ) {
      return
    }

    setForm({
      ...form,
      [name]: value
    })
  }

  const onSuccess = () => {
    setShowModal(true)
    setShowType(DEFAULTS.typeSuccess)
    setForm({})
  }

  const onError = () => {
    setShowModal(true)
    setShowType(DEFAULTS.typeError)
  }

  const checkup = (doc) => nameList.filter((i) => i.document === doc)

  const onSubmit = () => {
    const {
      name,
      document,
      apartment,
      phone,
      email,
      birthdate,
    } = form

    if (
      !name
      || !document
      || !apartment
      || !phone
      || !email
      || !birthdate
    ) {
      setShowType(DEFAULTS.typeComplete)
      setShowModal(true)
      return
    }

    const checkAlreadyExist = checkup(document)

    if (checkAlreadyExist.length) {
      setShowModal(true)
      setShowType(DEFAULTS.typeHasAlready)
      return
    }

    firebase
      .firestore()
      .collection(DEFAULTS.collection)
      .add(form)
      .then(() => onSuccess())
      .catch(() => onError())
  }

  const renderOtptions = (apto) => (
    <option key={apto.value} value={apto.value}>
      {apto.name}
    </option>
  )

  const closeModal = () => {
    setShowModal(false)
    setShowType('')
  }

  const renderModal = () => {
    let modalMessage = ''

    if (showType === DEFAULTS.typeSuccess) {
      modalMessage = 'Obrigado, informação enviada com sucesso!'
    }

    if (showType === DEFAULTS.typeError) {
      modalMessage = 'Humm, não foi possível completar o cadastro, tente novamente'
    }

    if (showType === DEFAULTS.typeComplete) {
      modalMessage = 'Opa! Todos os campos precisam ser preenchidos.'
    }

    if (showType === DEFAULTS.typeHasAlready) {
      modalMessage = 'Opa! Seu cadastro ja foi efetuado, veja abaixo.'
    }

    return (
      <Modal closeModal={closeModal}>
        <h5>{modalMessage}</h5>
        <button onClick={closeModal}>
          ok
        </button>
      </Modal>
    )
  }

  const renderBox = (item) => (
    <StyledBox key={item.id}>
      <p className="nome">{item.name}</p>
      <p><span>Apartamento:</span>{item.apartment}</p>
      <p><span>CPF:</span>{formatterRestrictedCPF(item.document)}</p>
      <p>
        <i className="fab fa-whatsapp-square" />
        {formatterPhone(item.phone)}
      </p>
      <p>
        <i className="fas fa-envelope-square" />
        {formatterRestrictedEmail(item.email)}
      </p>
    </StyledBox>
  )

  return (
    <>
      <StyledForm className="squad format-style">
        {showModal && renderModal()}
        <h5>
          Para cadastro, é necessário o preenchimento de todos os campos. Contamos com você :)
        </h5>

        <label>
          <b>Nome completo:</b>
          <input
            type="text"
            name="name"
            value={form?.name || ''}
            onChange={onInputChange}
          />
        </label>

        <label>
          <b>CPF:</b>
          <input
            type="number"
            name="document"
            placeholder="11 dígitos ex. 00011122233)"
            value={form?.document || ''}
            onChange={onInputChange}
          />
        </label>

        <label>
          <b>Apartamento:</b>
          <select
            onChange={onInputChange}
            className="select"
            name="apartment"
            value={Number(form.apartment)}
          >
            <option>Escolha um apartamento</option>
            {APTOS.map((apto) => renderOtptions(apto))}
          </select>
        </label>

        <label>
          <b>Telefone:</b>
          <input
            type="tel"
            name="phone"
            placeholder="DDD + Telefone (ex. 11922223344)"
            value={form?.phone || ''}
            onChange={onInputChange}
          />
        </label>

        <label>
          <b>Email:</b>
          <input
            type="email"
            name="email"
            value={form?.email || ''}
            onChange={onInputChange}
          />
        </label>

        <label>
          <b>Data de nascimento:</b>
          <input
            type="date"
            name="birthdate"
            value={form?.birthdate || ''}
            onChange={onInputChange}
          />
        </label>

        <button
          type="button"
          className="button"
          onClick={onSubmit}
        >
          Enviar
        </button>
      </StyledForm>

      {Boolean(nameList.length) && (
        <StyledList className="squad format-style">
          <h5>Voluntários:</h5>

          {nameList.map((item) => renderBox(item))}
        </StyledList>
      )}
    </>
  )
}

export default Formulario