import React from 'react'
import PropTypes from 'prop-types'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
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
const TermSelection = styled.a`
  line-height: 40px;
  margin: 0 8px;
  display: block;
  cursor: pointer;
  font-size: 1.2em;
  color: #000;

  &:after {
    font: normal normal normal 14px/1 FontAwesome;
    font-smoothing: antialiased;
    content: "\f107";
    position: absolute;
    right: 10px;
    display: inline-block;
    line-height: 40px;
  }
`

const TermSelect = styled.div`
  max-height: ${({open}) => open ? '200px' : '0'};
  overflow: hidden;
  transition: max-height 0.4s;
`
export default observer(class Omnibox extends React.Component {

  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    onLocate: PropTypes.func.isRequired,
  }

  obState = observable({
    showMenu: false,
    label: 'X'
  })

  handleClick = () => {
    console.log('menu click', this.obState.showMenu)
    this.obState.showMenu = !this.obState.showMenu
  }

  render() {
    const { onSearch } = this.props

    return(
       <Wrapper>
        <Content>
          <TermSelection onClick={this.handleClick}>
          {this.obState.showMenu ? 'Hledat kontejner na...' : this.obState.label}
          </TermSelection>
          <TermSelect open={this.obState.showMenu}>
            <SearchForm onSearch={onSearch} />
          </TermSelect>
        </Content>
      </Wrapper>
    )
  }

})
