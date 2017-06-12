import React, { PropTypes } from 'react'
import SearchForm from './SearchForm'
import Icon from '../Icon'
import styled from 'styled-components'

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 350px;
  display: flex;
  position: absolute;
  z-index: 300;
  border: 10px solid transparent;

  @media only screen
  and (max-width: 414px)
  and (-webkit-min-device-pixel-ratio: 2) {
    width: 100%;
  }
`
const Omnibox = styled.div`
  color: rgb(87,203,225);
  width: 100%;
  padding: 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2), 0 -1px 0px rgba(0,0,0,0.02);
  background: #fff;
  border: 1px solid rgb(87,203,225);
  animation: 3s linear 1s slidein;
`

const IconWrapper = styled.div`
  width: 35px;
  height: 35px;
  display: inline-block;
  background-clip: padding-box;
  border-radius: 30px;
  text-align: center;
  font-weight: bold;
  padding: 3px;
  margin: 6px 10px;
  border: 2px solid rgb(87,203,225);
`

const Controller = ({ onSearch, onLocate }) => {

  return(
     <Wrapper>
      <Omnibox className="omnibox">
          <IconWrapper>
            <Icon name="logo" size={20}/>
          </IconWrapper>

          <SearchForm onSearch={onSearch} />
      </Omnibox>
    </Wrapper>
  )
}

Controller.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onLocate: PropTypes.func.isRequired,
}

export default Controller
