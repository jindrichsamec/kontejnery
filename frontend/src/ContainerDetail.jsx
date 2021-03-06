import React, { Component } from 'react'
import { Dialog, FlatButton, CircularProgress } from 'material-ui'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { formatTimeInterval } from './utils/DateInterval'
import { formatDate, formatDayName } from './utils/DateTime'
import SearchQuery from './model/SearchQuery'
import { InfoBoxDanger, InfoBoxInfo } from './ui/InfoBox'

export default observer(class ContainerDetail extends Component {

  model = observable({
    detailInfo: null
  })

  componentDidMount() {
    const { match: { params: { slug }}} = this.props
    const since = SearchQuery.since.toISOString();
    fetch(`${process.env.REACT_APP_API_HOST}/api/${slug}?since=${since}`).then(this.handleSuccess, this.handleFail)
  }

  normalizeData = (data) => {
    const terms = data.terms.map((item) => {
      return {
        ...item,
        since: new Date(item.since),
        till: new Date(item.till)
      }
    })
    return {
      ...data,
      terms
    }
  }

  handleSuccess = async (response) => {
    const json = await response.json();

    const data = this.normalizeData(json.data)
    this.setDetailInfo(data)
  }

  handleFail = () => {
    console.error('Error during the request');
  }

  handleClose = () => {
    const { history } = this.props
    history.push('/')
  }

  setDetailInfo = (info) => {
    this.model.detailInfo = info
  }

  getModalTitle() {
    const {location: {state}} = this.props
    let name = state ? state.name : ''

    const { detailInfo } = this.model
    if (name === '') {
      name = detailInfo ? detailInfo.name : ''
    }
    return name
  }

  renderTerms(info) {
    return <table className="table table-stripped">
        <thead>
          <tr>
            <th>Den</th>
            <th>Datum</th>
            <th>Čas přistavení</th>
          </tr>
        </thead>
        <tbody>
          {info.terms.map((term) => {
            return <tr key={term.id}>
              <td>{formatDayName(term.since.getDay())}</td>
              <td>{formatDate(term.since)}</td>
              <td>{formatTimeInterval(term.since, term.till)}</td>
            </tr>
          })}
        </tbody>
      </table>
  }

  renderInfo() {
    return <div>
      <InfoBoxInfo className="small help-block">
        <strong>Do kontejneru patří</strong>
        <p>starý nábytek, koberce a linolea, zrcadla, umyvadla, vany a WC mísy, staré sportovní náčiní, autosklo a kovové předměty.</p>
      </InfoBoxInfo>
      <InfoBoxDanger className="small help-block">
        <strong>Do kontejneru nepatří</strong>
        <p>odkládat živnostenský odpad, nebezpečný odpad (např.: autobaterie, zářivky, barvy, rozpouštědla, motorové oleje a obaly od nich), bioodpad, stavební odpad, dále pak pneumatiky, elektrospotřebiče, televizory a PC monitory, počítače, lednice, mrazáky a sporáky.</p>
      </InfoBoxDanger>
      <p className="small">
        Zdroj: <a href="https://www.praha8.cz/kontejnery-na-velkoobjemovy-odpad.html" title="MČ Praha 8: Velkoobjemové kontejnery - Kontejnery na velkoobjemový odpad">
          https://www.praha8.cz/kontejnery-na-velkoobjemovy-odpad.html
        </a>
      </p>
    </div>;
  }

  render() {
    const { detailInfo } = this.model
    const actions = [<FlatButton onClick={this.handleClose}>Zavřít</FlatButton>]
    return (
      <Dialog open={true} onHide={this.handleClose} title={this.getModalTitle()} actions={actions} autoScrollBodyContent={true}>
        {detailInfo === null ? <CircularProgress /> : this.renderTerms(detailInfo)}
        {detailInfo && this.renderInfo()}
      </Dialog>
    );
  }

})
