import styled from '@emotion/styled'

export const TableContainer = styled.div`
  border-right: 1px solid #777;
  border-bottom: 1px solid #777;

  @media (max-width: 840px) {
    border-left: 1px solid #777;
    border-color: #ddd;
  }
`

export const RowTable = styled.div`
  width: 100%;
  clear: both;
  display: grid;
  grid-template-columns:100px calc(100% - 200px) 100px;

  @media (max-width: 840px) {
    grid-template-columns:50px calc(100% - 100px) 50px;

    &:nth-of-type(odd) {
      background-color: #eee;
    }

    & > div {
      border-left: none;
      padding: 10px 5px;
      border-color: #ddd;

      span {
        display: block;
        font-size: 13px;
        font-weight: bold;
        margin-bottom: 4px;
        cursor: pointer;
      }

      &:last-of-type {
        padding-top: 25px;
      }
    }
  }
`

export const HeaderTable = styled.div`
  width: 100%;
  clear: both;
  display: grid;
  grid-template-columns:100px calc(100% - 200px) 100px;

  @media (max-width: 840px) {
    display: block;

    & > div {
      border: none;
    }
  }
`

export const ColTable = styled.div`
  float: left;
  display: block;
  padding: 10px 20px;
  border-left: 1px solid #777;
  border-top: 1px solid #777;

  &:last-of-type,
  &:first-of-type {
    text-align: center;
  }

  &:last-of-type {
    i.fa-trash-alt {
      cursor: pointer;

      &:hover{
        color: red;
      }
    }
  }

  p {
    cursor: pointer;
  }

  .fa-sort {
    margin-left: 10px;
    cursor: pointer;
  }
`
