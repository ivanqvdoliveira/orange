import styled from '@emotion/styled'

export const StyledMenu = styled.nav`
  width: 100%;
  background-color: rgba(0, 0, 0, .7);
  padding: 20px;
  text-align: center;
  font-size: 20px;
  color: #fff;
`

export const StyledHome = styled.article`
  padding: 0 20px;
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