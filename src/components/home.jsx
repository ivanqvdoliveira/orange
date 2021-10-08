import React, { useState, useEffect } from 'react'
import { APTOS, PERIOD, WEEK_DAYS } from '../constants/selectsFill'
import { DEFAULT_VALUES, DEFAULT_COUNT } from '../constants/defaultValues'
import firebaseConection from '../utils/firebase'
import firebase from 'firebase'
import Modal from '../utils/Modal'
import {
  StyledHome,
  StyledDay,
  WarningMessage,
  StyledResident,
  StyledTable,
} from './styles'

const Home = (props) => {
  const { showResults } = props
  const [formValues, setFormValues] = useState(DEFAULT_VALUES)
  const [showWarning, setShowWarning] = useState(false)
  const [validDays, setValidDays] = useState(true)
  const [showWarningMsg, setShowWarningMsg] = useState(false)
  const [configModal, setConfigModal] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [nameList, setNameList] = useState([])
  const [repeatUser, setRepeatUser] = useState({})

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
  }, [setNameList])

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
    const user = nameList.find((morador) => morador.apartamento === formValues.apartamento)

    const hasUser = Boolean(user?.id)
    if (hasUser) {
      setRepeatUser(user?.id)
    }

    return hasUser
  }

  const confirmSent = () => {
    firebase
    .firestore()
    .collection('enquete')
    .doc(repeatUser)
    .set(formValues)
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

    firebase
      .firestore()
      .collection('enquete')
      .add(formValues)
      .then(() => setShowModalSuccess(true))
      .catch(() => setErrorModal())
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

  const renderPersonalWeek = (day, index, item) => {
    if (!item[day.value].personalFlow) return

    return (
      <span key={index}>
        <p>{item[day.value].notAllDay ? (
          <>
            <span>{day.name} - </span>
            {item[day.value].period.map((d, index) => <span key={index}>{d}</span>)}
          </>
        ) : (
          <>
            <span key={index}>
              <span>{day.name} - </span>
              <span>qualquer período</span>
            </span>
          </>
        )}</p>
      </span>
    )
  }

  const renderResident = (item) => (
    <StyledResident key={item.id}>
      <p><b>{item.morador}</b> - apto {item.apartamento}</p>
      {item.allWeek ? (
        <>
          <p>Disponível a semana inteira, qualquer período.</p>
        </>
      ) : WEEK_DAYS.map((day, index) => renderPersonalWeek(day, index, item))}
    </StyledResident>
  )

  const registerCount = () => {
    let newObject = DEFAULT_COUNT

    nameList.map((res) => {
      if (res.allWeek) {
        newObject = {
          ...newObject,
          allWeek: newObject.allWeek + 1
        }
      }

      WEEK_DAYS.map((day) => {
        if (!res[day.value].personalFlow) return null

        if (res[day.value].notAllDay) {
          res[day.value].period.map((d) => {
            switch (day.value) {
              case 'segunda':
                newObject = {
                  ...newObject,
                  segManha: d === 'manha' ? newObject.segManha + 1 : newObject.segManha,
                  segTarde: d === 'tarde' ? newObject.segTarde + 1 : newObject.segTarde,
                  segNoite: d === 'noite' ? newObject.segNoite + 1 : newObject.segNoite,
                }
                break;

              case 'terca':
                newObject = {
                  ...newObject,
                  terManha: d === 'manha' ? newObject.terManha + 1 : newObject.terManha,
                  terTarde: d === 'tarde' ? newObject.terTarde + 1 : newObject.terTarde,
                  terNoite: d === 'noite' ? newObject.terNoite + 1 : newObject.terNoite,
                }
                break;

              case 'quarta':
                newObject = {
                  ...newObject,
                  quaManha: d === 'manha' ? newObject.quaManha + 1 : newObject.quaManha,
                  quaTarde: d === 'tarde' ? newObject.quaTarde + 1 : newObject.quaTarde,
                  quaNoite: d === 'noite' ? newObject.quaNoite + 1 : newObject.quaNoite,
                }
                break;

              case 'quinta':
                newObject = {
                  ...newObject,
                  quiManha: d === 'manha' ? newObject.quiManha + 1 : newObject.quiManha,
                  quiTarde: d === 'tarde' ? newObject.quiTarde + 1 : newObject.quiTarde,
                  quiNoite: d === 'noite' ? newObject.quiNoite + 1 : newObject.quiNoite,
                }
                break;

              case 'sexta':
                newObject = {
                  ...newObject,
                  sexManha: d === 'manha' ? newObject.sexManha + 1 : newObject.sexManha,
                  sexTarde: d === 'tarde' ? newObject.sexTarde + 1 : newObject.sexTarde,
                  sexNoite: d === 'noite' ? newObject.sexNoite + 1 : newObject.sexNoite,
                }
                break;

              case 'sabado':
                newObject = {
                  ...newObject,
                  sabManha: d === 'manha' ? newObject.sabManha + 1 : newObject.sabManha,
                  sabTarde: d === 'tarde' ? newObject.sabTarde + 1 : newObject.sabTarde,
                  sabNoite: d === 'noite' ? newObject.sabNoite + 1 : newObject.sabNoite,
                }
                break;

              default:
                break;
            }

            return null
          })
        }
        return null
      })
      return null
    })
    return newObject
  }

  const renderResults = () => {
    const countList = registerCount()

    if (!countList) return

    return (
      <>
        <StyledHome>
          <p>Resultados somados de escolha por dia + quem escolheu semana inteira</p>
          <StyledTable>
            <div className="col">
              <div>
                <div className="row-title">
                  Segunda Feira
                </div>
                {Boolean(countList.segManha) && (
                  <p>Manhã: {countList.segManha + countList.allWeek}</p>
                )}
                {Boolean(countList.segTarde) && (
                  <p>Tarde: {countList.segTarde + countList.allWeek}</p>
                )}
                {Boolean(countList.segNoite) && (
                  <p>Noite: {countList.segNoite + countList.allWeek}</p>
                )}
              </div>
            </div>
            <div className="col">
              <div>
                <div className="row-title">
                  Terça Feira
                </div>
                {Boolean(countList.terManha) && (
                  <p>Manhã: {countList.terManha + countList.allWeek}</p>
                )}
                {Boolean(countList.terTarde) && (
                  <p>Tarde: {countList.terTarde + countList.allWeek}</p>
                )}
                {Boolean(countList.terNoite) && (
                  <p>Noite: {countList.terNoite + countList.allWeek}</p>
                )}
              </div>
            </div>
            <div className="col">
              <div>
                <div className="row-title">
                  Quarta Feira
                </div>
                {Boolean(countList.quaManha) && (
                  <p>Manhã: {countList.quaManha + countList.allWeek}</p>
                )}
                {Boolean(countList.quaTarde) && (
                  <p>Tarde: {countList.quaTarde + countList.allWeek}</p>
                )}
                {Boolean(countList.quaNoite) && (
                  <p>Noite: {countList.quaNoite + countList.allWeek}</p>
                )}
              </div>
            </div>
            <div className="col">
              <div>
                <div className="row-title">
                  Quinta Feira
                </div>
                {Boolean(countList.quiManha) && (
                  <p>Manhã: {countList.quiManha + countList.allWeek}</p>
                )}
                {Boolean(countList.quiTarde) && (
                  <p>Tarde: {countList.quiTarde + countList.allWeek}</p>
                )}
                {Boolean(countList.quiNoite) && (
                  <p>Noite: {countList.quiNoite + countList.allWeek}</p>
                )}
              </div>
            </div>
            <div className="col">
              <div>
                <div className="row-title">
                  Sexta Feira
                </div>
                {Boolean(countList.sexManha) && (
                  <p>Manhã: {countList.sexManha + countList.allWeek}</p>
                )}
                {Boolean(countList.sexTarde) && (
                  <p>Tarde: {countList.sexTarde + countList.allWeek}</p>
                )}
                {Boolean(countList.sexNoite) && (
                  <p>Noite: {countList.sexNoite + countList.allWeek}</p>
                )}
              </div>
            </div>
            <div className="col">
              <div>
                <div className="row-title">
                  Sábado
                </div>
                {Boolean(countList.sexManha) && (
                  <p>Manhã: {countList.sabManha + countList.allWeek}</p>
                )}
                {Boolean(countList.sabTarde) && (
                  <p>Tarde: {countList.sabTarde + countList.allWeek}</p>
                )}
                {Boolean(countList.sabNoite) && (
                  <p>Noite: {countList.sabNoite + countList.allWeek}</p>
                )}
              </div>
            </div>
          </StyledTable>

          {nameList.map((item, index) => renderResident(item, index))}
          <span className="clear" />
        </StyledHome>
        <span className="clear" />
      </>
    )
  }

  return (
    <div className="squad">
      {showModal && renderModal()}
      {showResults ? renderResults() : (
        <>
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
        </>
      )}
    </div>
  )
}

export default Home