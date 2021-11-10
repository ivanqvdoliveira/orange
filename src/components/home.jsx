import React from 'react'
import { StyledList } from './styles'

const Home = () => {

  return (
    <StyledList className="squad align-center">
      <p className="home-text">Olá vizinhos. Para dar segmento no AVCB do condomínio, é obrigatório, para o número de apartamentos, que tenhamos algumas pessoas treinada para ser brigadista, caso um dia seja necessário até a chegada dos bombeiros. Precisamos de  no mínimo 4 voluntários, mas não existe um número máximo, se todos quiserem, melhor ainda. Mas que seja de 4 apartamentos diferente, só para não acontecer de ter em apenas um apartamento 3 pessoas, e quando precisarmos, eles estão fora de casa :)</p>

      <p className="home-text">É um curso de 2 horas, que será agendado para os interessados, vamos aprender a usar os equipamentos e também como agir num momento que seja preciso. Para saber mais sobre a necessidade desse treinamento, segue abaixo uma reportagem atualizada. E também o botão para se voluntariar. Fico no aguardo.</p>

      <button className="button" onClick={() => window.location = '/formulario'}>
        Cadastro para brigadista do Louvre
      </button>
      <br />
      <button className="button" onClick={() => window.location = 'https://www.duplique.com.br/noticia/brigada-de-incendio-entenda-a-importancia-de-seu-condominio-ter-uma'}>
        Porque ser brigadista? (reportagem)
      </button>
    </StyledList>
  )
}

export default Home