import styled from 'styled-components'

export const SIZE = 30;

export default styled.div`
  width: ${SIZE}px;
  height: ${SIZE}px;
  display: inline-block;
  background-clip: padding-box;
  border-radius: ${SIZE}px;
  text-align: center;
  font-weight: bold;
  border: 1px solid;
  background: white;
  z-index: +10;
  position: absolute;
  left: ${-SIZE / 2}px;
  top: ${-SIZE / 2}px;

  &:hover {
    cursor: pointer
  }
`
