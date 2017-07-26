import React from 'react'
import PropTypes from 'prop-types'
import SearchForm from './SearchForm'
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
const Content = styled.div`
  color: rgb(87,203,225);
  width: 100%;
  padding: 5px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2), 0 -1px 0px rgba(0,0,0,0.02);
  background: #fff;
  animation: 3s linear 1s slidein;
`
const Omnibox = ({onSearch}) => {
  return(
    <Wrapper>
      <Content>
        <SearchForm onSearch={onSearch} />
      </Content>
    </Wrapper>
  )
}

Omnibox.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onLocate: PropTypes.func.isRequired,
}

export default Omnibox
