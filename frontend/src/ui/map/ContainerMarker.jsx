import styled, { css } from 'styled-components'
import Marker from './Marker'

export default styled(Marker)`
  border: 1px solid #58cf90;
  color: #58cf90;
  background: white;

  ${props => props.expired && css`
    color: silver;
    border-color: silver;
    z-index: +5;
  `}
`
