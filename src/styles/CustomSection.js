import styled from '@emotion/styled'

export const CustomSection = styled.section`
  background-color: #fff;
  padding: 15px;
  width: 100%;
  border-radius: 20px;

  &.desktop {
    width: calc(100% - 230px);
    position: relative;
    display: block;
    float: right;
  }
`