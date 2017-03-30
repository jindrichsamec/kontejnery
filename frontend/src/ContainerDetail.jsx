import React, { Component, PropTypes } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import Icon from './Icon'
import { formatDate, formatDayName, formatTimeInterval } from './utils/DateInterval'
import SearchQuery from './model/SearchQuery'

export default observer(class ContainerDetail extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
  }

  model = observable({
    detailInfo: null
  })

  componentDidMount() {
    const since = SearchQuery.since.toISOString();
    fetch(`${process.env.REACT_APP_API_HOST}/api/${this.props.id}?since=${since}`).then(this.handleSuccess, this.handleFail)
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

  handleSuccess = (response) => {
    response.json().then(json => {
      const data = this.normalizeData(json.data)
      this.setDetailInfo(data)
    })
  }

  handleFail = () => {
    console.error('Error during the request');
  }

  setDetailInfo = (info) => {
    this.model.detailInfo = info
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
      <div className="bs-callout bs-callout-info small help-block">
        <strong>Do kontejneru patří</strong>
        <p>starý nábytek, koberce a linolea, zrcadla, umyvadla, vany a WC mísy, staré sportovní náčiní, autosklo a kovové předměty.</p>
      </div>
      <div className="bs-callout bs-callout-danger small help-block">
        <strong>Do kontejneru nepatří</strong>
        <p>odkládat živnostenský odpad, nebezpečný odpad (např.: autobaterie, zářivky, barvy, rozpouštědla, motorové oleje a obaly od nich), bioodpad, stavební odpad, dále pak pneumatiky, elektrospotřebiče, televizory a PC monitory, počítače, lednice, mrazáky a sporáky.</p>
      </div>
      <p className="small">
        Zdroj: <a href="https://www.praha8.cz/kontejnery-na-velkoobjemovy-odpad.html" title="MČ Praha 8: Velkoobjemové kontejnery - Kontejnery na velkoobjemový odpad">
          https://www.praha8.cz/kontejnery-na-velkoobjemovy-odpad.html
        </a>
      </p>
    </div>;

  }

  render() {
    const { onClose, name } = this.props;
    const { detailInfo } = this.model

    return (<Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {detailInfo === null ? <Icon name="circle-o-notch" /> : this.renderTerms(detailInfo)}
        {detailInfo && this.renderInfo()}
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-default" onClick={onClose}>Zavřít</Button>
      </Modal.Footer>
    </Modal>);
  }

})
