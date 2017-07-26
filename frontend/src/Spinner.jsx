import React from 'react'
import Icon from './Icon'
import styled, {keyframes} from 'styled-components'

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  display: inline-block;

  & .fa-circle-o-notch {
    animation: ${rotate360} infinite 1s linear;
  }
`

export default () => {
  return (<Spinner>
    <Icon name="circle-o-notch" />
  </Spinner>)
}
