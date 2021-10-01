import React, { useState, useEffect } from 'react'
import { APTOS, PERIOD, WEEK_DAYS } from '../constants/selectsFill'
import { DEFAULT_VALUES } from '../constants/defaultValues'
import firebaseConection from '../utils/firebase'
import firebase from 'firebase'
import Modal from '../utils/Modal'
import {
  StyledHome,
  StyledDay,
  WarningMessage,
} from './styles'

const Home = () => {
  const [formValues, setFormValues] = useState(DEFAULT_VALUES)
  const [showWarning, setShowWarning] = useState(false)
  const [validDays, setValidDays] = useState(true)
  const [showWarningMsg, setShowWarningMsg] = useState(false)
  const [configModal, setConfigModal] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [nameList, setNameList] = useState({})

  useEffect(() => {
    firebaseConection
    .firestore()
    .collection('enquete')
    .onSnapshot(snapshot => {
      const morador = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setNameList(morador)
    })
  }, [])

  const renderOtptions = (apto) => (
    <option key={apto.value} value={apto.value}>
      {apto.name}
    </option>
  )

  const onInputChange = (e) => {
    const { name, value } = e.target
    setShowWarning(false)
    setShowWarningMsg(false)
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const onChangePreference = (e) => {
    const { value } = e.target
    setValidDays(Boolean(value === 'yes'))
    setShowWarning(false)
    setShowWarningMsg(false)
    setFormValues({
      ...formValues,
      allWeek: Boolean(value === 'yes'),
    })
  }

  const onCheckboxChange = (e) => {
    const { name } = e.target
    setShowWarning(false)
    setShowWarningMsg(false)
    setValidDays(true)
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        personalFlow: Boolean(!formValues[name]?.personalFlow),
      }
    })
  }

  const onMultipleSelectChange = (e) => {
    const { name, selectedOptions } = e.target
    const value = Array.from(selectedOptions, option => option.value)
    if (value.length === 3) {
      setFormValues({
        ...formValues,
        [name]: {
          ...formValues[name],
          notAllDay: false,
        }
      })

      return
    }
    setShowWarning(false)
    setShowWarningMsg(false)
    setValidDays(true)
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        period: value,
      }
    })
  }

  const onRadioChange = (e) => {
    const { name, value } = e.target
    setShowWarning(false)
    setShowWarningMsg(false)
    setValidDays(true)
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        notAllDay: Boolean(value === 'sim'),
      }
    })
  }

  const renderWeekdays = (day) => (
    <StyledDay key={day.value}>
      <label>
        <input onChange={onCheckboxChange} type="checkbox" name={day.value} />
        {day.name}
      </label>
      {formValues[day.value]?.personalFlow && (
        <>
          <div>
            <span>O dia todo?</span>
            <label className="mid">
              <input onChange={onRadioChange} type="radio" defaultChecked value="nao" name={day.value} checked={!formValues[day.value]?.notAllDay} />
              Sim
            </label>
            <label className="mid">
              <input onChange={onRadioChange} type="radio" value="sim" name={day.value} checked={formValues[day.value]?.notAllDay} />
              Não
            </label>
          </div>
          {formValues[day.value]?.notAllDay && (
            <>
              <span>Qual período?</span>
              <select onChange={onMultipleSelectChange} name={day.value} multiple>
                {PERIOD.map((time) => renderOtptions(time))}
              </select>
            </>
          )}
        </>
      )}
    </StyledDay>
  )

  const setShowModalSuccess = () => {
    setShowModal(true)
    setConfigModal('success')
  }

  const setErrorModal = () => {
    setShowModal(true)
    setConfigModal('error')
  }

  const confirmRepeated = () => {
    const user = nameList.filter((morador) => morador.apartamento === formValues.apartamento)

    return Boolean(user.length)
  }

  const confirmSent = () => {
    firebase
      .firestore()
      .collection('enquete')
      .add(formValues)
      .then(() => setShowModalSuccess(true))
      .catch(() => setErrorModal())
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!formValues.morador || !formValues.apartamento) {
      window.scrollTo(0, 0)
      setShowWarning(true)
      return
    }

    if (!validDays) {
      setShowWarningMsg(true)
      return
    }

    if (confirmRepeated()) {
      setShowModal(true)
      setConfigModal('repeat')
      return
    }

    confirmSent()
  }

  const closeModal = () => {
    if (configModal === 'success') {
      setFormValues(DEFAULT_VALUES)
    }
    setShowModal(false)
    setConfigModal('')
  }

  const renderModal = () => {
    switch (configModal) {
      case 'success':
        return (
          <Modal closeModal={closeModal}>
            <p>Obrigado, informação enviada com sucesso!</p>
            <button onClick={closeModal}>
              ok
            </button>
          </Modal>
        )

      case 'repeat':
        return (
          <Modal closeModal={closeModal}>
            <p>Ja foi feito o envio do seu apartamento anteriormente, deseja prosseguir e alterar para novos horarios?</p>
            <button
              className="cancelButton"
              onClick={closeModal}>
              Cancelar
            </button>
            <button className="confirmButton"
              onClick={confirmSent}>
              Confirmar
            </button>
          </Modal>
        )
      default:
        break;
    }
  }

  return (
    <div className="squad">
      {showModal && renderModal()}
      <StyledHome>
        <p>Vamos agendar o dia para próxima reunião com a Gold?</p>
        <p>Eles precisam que a data da reunião seja enviada antes de 10 dias da data, então, primeiramente, vamos ver qual o melhor dia da semana e horário, e passar para eles uma data baseada nessas informações.</p>
        <p>Fico no aguardo :) </p>
        {showWarning && (
          <WarningMessage>
            Nome do Morador e Apartamento são obrigatórios.
          </WarningMessage>
        )}
        {showWarningMsg && (
          <WarningMessage>
            Se não vai detalhar nenhum dia, escolha a opção: Qualquer dia e horário.
          </WarningMessage>
        )}
        <div className="format-style">
          <form onSubmit={onSubmit}>
            <input
              onChange={onInputChange}
              type="text"
              name="morador"
              placeholder="Seu nome?"
              value={formValues.morador}
            />
            <select
              onChange={onInputChange}
              name="apartamento"
              value={Number(formValues.apartamento)}
            >
              <option>Escolha um apartamento</option>
              {APTOS.map((apto) => renderOtptions(apto))}
            </select>
            <div>
              <label className={formValues.allWeek ? 'preference active' : 'preference'}>
                <input onChange={onChangePreference} type="radio" defaultChecked value="yes" name="allWeek" />
                Qualquer dia e horário
              </label>
              <label className={formValues.allWeek ? 'preference' : 'preference active'}>
                <input onChange={onChangePreference} type="radio" value="no" name="allWeek" />
                Escolher dias e horários
              </label>
            </div>

            {!formValues.allWeek && (
              <div>
                {WEEK_DAYS.map((day) => renderWeekdays(day))}
              </div>
            )}
            <button type="submit">
              Enviar
            </button>
          </form>
        </div>
      </StyledHome>
    </div>
  )
}

export default Home