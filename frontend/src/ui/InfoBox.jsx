import styled from 'styled-components'

const InfoBox = styled.div`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #eee;
  border-left-width: 5px;
  border-radius: 3px;
`

export const InfoBoxDanger = styled(InfoBox)`
  border-left-color: #ce4844;
`

export const InfoBoxInfo = styled(InfoBox)`
  border-left-color: #1b809e;
`

export default InfoBox
