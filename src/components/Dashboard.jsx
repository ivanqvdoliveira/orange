import React, {useState} from 'react'
import axios from 'axios'
import Modal from '../utils/Modal'
import { formatterCEP } from '../utils/formatter'


const Address = () => {
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [modalTypeAddress, setModalTypeAddress] = useState(false)

  const onChangeInputValue = (e) => {
    const {value, name}  = e.target
    if (name === 'cep' && value.length >= 9) return 
    setForm({
      ...form,
      [name]: value,
    })
  }

  const submitAddress = () => {
    console.log(form)
    setModalTypeAddress(true)
    setShowModal(true)
  }

  const submitForm = () => {
    console.log(form)
    setModalTypeAddress(false)
    setShowModal(true)
  }

  const onButtonCEPClick = () => {
    if (!form.cep) return

    const value = form.cep.replace(/[^0-9]+/g, '')
    const url = `https://viacep.com.br/ws/${value}/json/`

    axios.get(url)
      .then((resp) => {
        const newForm = {
          ...resp.data,
          street: resp.data.logradouro
        }
        setForm(newForm)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const renderModal = () => {
    if (modalTypeAddress) {
      return (
        <Modal closeModal={closeModal}>
          <h3>Você enviou:</h3>
          <p>{form.street}, {form.numero}</p>
          <p>{form.bairro} - {form.localidade} - {form.uf}</p>
          <p>{form.cep}</p>
          <h4>com sucesso</h4>
        </Modal>
      )
    }

    return (
      <Modal closeModal={closeModal}>
        <h3>Você enviou:</h3>
        <p>{form.formName}</p>
        <p>{form.formEmail}</p>
        <p>{form.formPhone}</p>
        <p>{form.formMsg}</p>
        <h4>com sucesso</h4>
      </Modal>
    )
  }

  return (
    <>
      <div>
        <div className='squad format-style'>
          <article>
            <h1>Endereço <i className="fas fa-igloo" /></h1>
          </article>
          <input
            name='cep'
            value={formatterCEP(form.cep) || ''}
            placeholder="cep"
            onChange={onChangeInputValue}
          />
          <button onClick={onButtonCEPClick}>
            Pesquisar
          </button>
          <input
            name='street'
            placeholder='logradouro'
            value={form.street || ''}
            onChange={onChangeInputValue}
          />
          <input
            name='numero'
            placeholder='numero'
            value={form.numero || ''}
            onChange={onChangeInputValue}
            />
          <input
            name='bairro'
            placeholder='bairro'
            value={form.bairro || ''}
            onChange={onChangeInputValue}
          />
          <input
            name='localidade'
            value={form.localidade || ''}
            placeholder='localidade'
            onChange={onChangeInputValue}
          />
          <select value={form.uf} name="uf" onChange={onChangeInputValue}>
            <option></option>
            <option value="SP">SP</option>
            <option value="PB">PB</option>
            <option value="RJ">RJ</option>
          </select>
          <button type='submit' className='button' name='Submit' onClick={submitAddress}>
            Enviar
          </button>
        </div>
      </div>
      <div className='squad format-style'>
        {showModal && (
          renderModal()
          )
        }
        <article>
          <h1>Contact <i className="fas fa-igloo" /></h1>
        </article>
        <input
          name='formName'
          type='text'
          id='Nome'
          placeholder='Nome'
          required
          onChange={(e) => onChangeInputValue(e)}
        />
        <input
          name='formEmail'
          type='text'
          id='email'
          placeholder='E-mail (ex. meunome@meudominio.com)'
          pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
          required
          onChange={(e) => onChangeInputValue(e)}
        />
        <input
          name='formPhone'
          type='number'
          id='fone'
          placeholder='Telefone'
          required
          onChange={(e) => onChangeInputValue(e)}
        />
        <textarea
          name='formMsg'
          id='mensagem'
          placeholder='Digite aqui a sua mensagem'
          required
          onChange={(e) => onChangeInputValue(e)}
        />
        <button type='submit' className='button' name='Submit' onClick={submitForm}>
          Enviar
        </button>
      </div>
    </>
  )
}

export default Address
