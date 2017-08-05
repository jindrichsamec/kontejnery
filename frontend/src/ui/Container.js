import styled, { css } from 'styled-components'

export const SIZE = 30;

export default styled.div`
  width: ${SIZE}px;
  height: ${SIZE}px;
  display: inline-block;
  background-clip: padding-box;
  border-radius: ${SIZE}px;
  text-align: center;
  font-weight: bold;
  padding: 4px 3px;
  border: 1px solid #58cf90;
  color: #58cf90;
  background: white;
  z-index: +10;
  position: absolute;
  left: ${-SIZE / 2}px;
  top: ${-SIZE / 2}px;

  &:hover {
    cursor: pointer
  }

  ${props => props.expired && css`
    color: silver;
    border-color: silver;
    z-index: +5;
  `}
`
