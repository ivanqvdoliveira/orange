import styled from '@emotion/styled'

export const StyledMenu = styled.nav`
  width: 100%;
  background-color: rgba(0, 0, 0, .7);
  padding: 20px 15px;
  text-align: left;
  font-size: 20px;
  color: #fff;

  span {
    display: inline-block;
    width: calc(100% - 130px);
    vertical-align: middle;
  }
`

export const StyledHome = styled.article`
  padding: 20px;
  max-width: 500px;
  margin: 30px auto;

  p {
    margin-bottom: 10px;
  }

  select, input[type="text"] {
    height: 42px;
    padding: 10px;
    color: #444;
    font-size: 16px;
    font-family: 'Josefin Sans', sans-serif;
    margin-bottom: 15px;

    & > option {
      height: 20px;
    }
  }

  label {
    width: 100%;
    vertical-align: top;
    display: inline-block;

    &.mid {
      width: 50%;
    }

    &.preference {
      text-align: center;
      width: calc(50% - 2px);
      padding: 10px 5px;

      input {
        margin: 0 auto 7px;
        width: 100%;
        display: block;
      }

      &.active {
        background-color: #becaff;
      }
    }

    input {
      margin: 0 7px 0 0;
      display: inline-block;
      vertical-align: top;
    }
  }

  button {
    margin-top: 50px;
    border: none;
    background-color: #269136;
    color: #fff;
    width: 100%;
    height: 60px;
    font-size: 23px;
    margin-bottom: 100px;
  }
`

export const StyledDay = styled.div`
  display: inline-block;
  width: calc(50% - 5px);
  margin-right: 10px;
  vertical-align: top;
  border: 1px solid #d3d3d3;
  margin-bottom: 10px;
  background-color: rgba(0, 0, 0, .1);
  padding: 10px;

  &:nth-of-type(even) {
    border-right: none;
    margin-right: 0;
  }

  label {
    display: inline-block;
    width: 100%;
    margin-bottom: 20px;

    input {
      margin: 0 7px 0 0;
      vertical-align: top;
      display: inline-block;
    }
  }

  div {
    & > span {
      display: block;
      margin-bottom: 4px;
    }
  }

  select[multiple] {
    height: auto;
    padding: 10px;

    & > option {
      margin-bottom: 10px;
    }
  }
`

export const WarningMessage = styled.div`
  padding: 15px;
  text-align: center;
  background-color: #ff9a9a;
  color: #7a0000;
`

export const StyledResident = styled.div`
  display: block;
  background-color: rgba(0, 0, 0, .1);
  margin-bottom: 20px;
  padding: 10px;

  &:last-of-type {
    margin-bottom: 50px;
  }
`


export const StyledTable = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: calc(33.333333% - 2px) calc(33.333333% - 2px) calc(33.333333% - 2px);
  grid-gap: 6px;
  margin-bottom: 20px;

  .col {
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 10px;
    position: relative;
    text-align: center;
    background-color: #eee;

    .row-title {
      font-weight: bold;
      margin-bottom: 10px;
      border-bottom: 1px solid;
    }

    p {
      margin-bottom: 5px;
    }
  }
`

export const StyledButton = styled.button`
  display: inline-block;
  width: 110px;
  background-color: #becaff;
  border: none;
  height: 35px;
  color: #2e2e2e;
  font-weight: bold;
  margin-left: 20px;
`


export const StyledForm = styled.div`
  padding: 10px 10px 100px;
  color: #666;

  &.format-style {
    h5 {
      line-height: 33px;
      text-align: center;
      margin-bottom: 50px;
    }
  }

  label {
    margin-bottom: 30px;

    b {
      font-size: 18px;
    }

    input {
      height: 40px;
      padding: 10px;
    }

    select {
      background-color: transparent;
      padding: 10px;
      height: 40px;
    }
  }
`

export const StyledList = styled.div`
  padding: 10px 10px 100px;
  color: #666;

  h5 {
    line-height: 33px;
    margin-bottom: 50px;
  }

  p {
    &.home-text {
      color: #333;
      font-size: 18px;
      margin-bottom: 20px;
      margin-top: 10px;
    }
  }
`

export const StyledBox = styled.div`
  background-color: #eee;
  margin-bottom: 20px;
  padding: 20px;

  p {
    margin: 0 0 10px;
    width: calc(50% - 10px);
    display: inline-block;

    &:nth-of-type(odd) {
      margin-left: 20px;
    }

    &.nome {
      font-size: 17px;
      font-weight: bold;
      text-transform: uppercase;
      width: 100%;
      margin-left: 0;
      margin-bottom: 20px;
    }

    span {
      font-weight: bold;
      margin-right: 10px;
      color: #333;
    }

    i {
      font-size: 20px;
      vertical-align: middle;
      margin-right: 10px;
    }
  }
`
