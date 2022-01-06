import React from 'react'
import {
  TableContainer,
  RowTable,
  HeaderTable,
  ColTable,
} from './styles'

const RegisterClient = () => {

  return (
    <>
      <TableContainer>
        <HeaderTable>
          <ColTable>
            ID
          </ColTable>
          <ColTable>
            NOME
          </ColTable>
          <ColTable />
        </HeaderTable>
        <RowTable>

        </RowTable>
      </TableContainer>
    </>
  )
}

export default RegisterClient