import React from 'react'
import RegisterClient from './table/RegisterClient'
import  {
  CustomTitle,
  StyledSearch,
  StyledButtonAdd,
} from './styles'

const Home = () => (
  <>
    <CustomTitle>
      CRUD Exemplo
    </CustomTitle>

    <section>
      <StyledSearch>
        <input type="search" />
        <i class="fas fa-search" />
      </StyledSearch>

      <StyledButtonAdd>
        Novo
        <i class="fas fa-plus"></i>
      </StyledButtonAdd>
    </section>

    <section>
      <RegisterClient />
    </section>
  </>
)

export default Home
