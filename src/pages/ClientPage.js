import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Table } from 'react-bootstrap'
import * as Chartjs from 'react-chartjs-2'
import { DonutChart } from '@hydrogenapi/react-components'

import Auth from '../auth';
import Initializer from '../Initializer';
import SpinnerComponent from '.././components/SpinnerComponent';
import Navbar from '../components/Navbar';
import { formatCurrency } from './helpers';
import {
  getUser,
  getAllSecurities,
  getClientAnnualVolume,
  getClientHoldings,
  getClientCumulativeReturn,
  getClientAssetSize,
  logoutUser,
  setAccount
} from '../store/actions/index'
import '../App.css'



class ClientPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: '',
      price: null,
      isDeleting: false,
      currentBalance: null,
      accountName: ''
    }
  }

  componentDidUpdate(prevProps) {
    const { onGetClientHoldings, onGetClientAssetSize, onGetClientCumulativeReturn, onGetClientAnnualVolume, user, clientAssetSize, accessToken } = this.props;
    if (accessToken !== prevProps.accessToken) {
      this.setState({ accessToken: accessToken });
    }
    if (user !== prevProps.user) {
      onGetClientAssetSize(user.id);
      onGetClientHoldings(user.id);
      onGetClientCumulativeReturn(user.id)
      onGetClientAnnualVolume(user.id)
    }
    if (clientAssetSize.length !== prevProps.clientAssetSize.length) {
      this.setState({ currentBalance: clientAssetSize.slice(-1)[0].value });
    }
  }

  handleShowAccountName = (name) => {
    this.setState({ accountName: name })
  }

  onLogoutClick = () => {
    const { onLogoutUser } = this.props;
    Auth.signout(() => {
      this.props.history.push('/');
      onLogoutUser();
    })
  }

  onResetClick = async () => {
    this.setState({ isDeleting: true });
    const { onLogoutUser, onSetAccount } = this.props;
    const { clearAll } = Initializer;
    const accessToken = localStorage.getItem('accessToken');
    await clearAll(accessToken);
    Auth.signout(() => {
      onLogoutUser();
      this.props.history.push('/')
    })
    this.setState({ isDeleting: false });
    onSetAccount({});
  }


  componentDidMount = () => {
    const { onGetUser, onGetAllSecurities } = this.props;
    const username = localStorage.getItem('username')
    onGetAllSecurities();
    onGetUser({ username: username });
  }
  render() {
    const { clientAssetSize, clientHoldings, clientAnnualVolume, clientCumulativeReturn, securities, user, history } = this.props;
    const { currentBalance, isDeleting } = this.state;

    let totalEarnings;
    if (clientAssetSize.length > 0) {
      const firstCashFlow = clientAssetSize[0];
      const allAdditions = clientAssetSize.map(s => s.additions).reduce((prev, next) => prev + next);
      totalEarnings = currentBalance - firstCashFlow.value - allAdditions;
    }
    const colors = ['#16D9F0', '#0D96A6', '#327fa8', '#133080', '#335fd6']
    const data = (clientHoldings && clientHoldings.length > 0 && securities.length > 0) ? securities.map((s, index) => {
      const clientHoldingsGroup = clientHoldings.filter(ch => s.id !== ch.security_id);
      const weight = clientHoldingsGroup.map(item => item.weight).reduce((prev, next) => prev + next);
      const amount = clientHoldingsGroup.map(item => item.amount).reduce((prev, next) => prev + next);
      let securityType;
      if (s.ticker === 'VTI') securityType = 'Stocks';
      if (s.ticker === 'BND') securityType = 'Bonds';
      return {
        value: weight / 2,
        label: securityType,
        asset_class: s.asset_class,
        color: colors[index],
        amount: amount,
        name: s.name,
        ticker: s.ticker
      }
    }) : [];
    return (
      isDeleting ? <SpinnerComponent /> : <div className="dashboard-container">
        <Navbar
          handleShowAccountName={(name) => this.handleShowAccountName(name)}
          onResetClick={this.onResetClick} user={user} routerHistory={history}
          onLogoutClick={this.onLogoutClick}
        />
        <div className="container">
          <Row className="mt-3 mb-2 ml-2">
            <h3 className="font-weight-light client-page-title">All accounts</h3>
          </Row>
          <Row>
            <Card className="goal-card-dashboard m-2 float-left">
              <Row>
                <Col className="d-lg-block align-items-stretch">
                  <a href="#d" className="card-body media align-items-center text-body">
                    <i className="lnr lnr-checkmark-circle display-4 d-block text-primary"></i>
                    <span className="media-body d-block ml-4 mt-4">
                      <span className="goal-cards-text"><span className="font-weight-bolder">$ {currentBalance && formatCurrency(currentBalance.toFixed(2))}</span></span><br />
                      <small className="text-muted">Current balance</small>
                    </span>
                  </a>
                  <a href="#d" className="card-body media align-items-center text-body">
                    <i className="lnr lnr-checkmark-circle display-4 d-block text-primary"></i>
                    <span className="media-body d-block ml-4 mt-4">
                      <span className="goal-cards-text"><span className="font-weight-bolder">$ {totalEarnings && formatCurrency(totalEarnings.toFixed(2))}</span></span><br />
                      <small className="text-muted">Total earnings</small>
                    </span>
                  </a>
                </Col>
                <Col className="d-lg-block align-items-stretch">
                  <a href="#d" className="card-body media align-items-center text-body">
                    <i className="lnr lnr-checkmark-circle display-4 d-block text-primary"></i>
                    <span className="media-body d-block ml-4 mt-4">
                      <span className="goal-cards-text"><span className="font-weight-bolder">{clientCumulativeReturn.cum_return && clientCumulativeReturn.cum_return.toFixed(2)} %</span></span><br />
                      <small className="text-muted">Performance</small>
                    </span>
                  </a>
                  <a href="#d" className="card-body media align-items-center text-body">
                    <i className="lnr lnr-checkmark-circle display-4 d-block text-primary"></i>
                    <span className="media-body d-block ml-4 mt-4">
                      <span className="goal-cards-text"><span className="font-weight-bolder">{clientAnnualVolume.ann_vol && clientAnnualVolume.ann_vol.toFixed(2)} %</span></span><br />
                      <small className="text-muted">Volatility</small>
                    </span>
                  </a>
                </Col>
              </Row>
            </Card>
            <Card className="client-page-dashboard m-2 pt-4 flex-grow-1 float-right">
              <DonutChart
                legend="left"
                width={280}
                height={250}
                data={data.map(d => { return { label: d.label, value: d.value / 100, color: d.color } })}
              />
              <div className="client-page-table-dashboard">
                <Table responsive className="card-table client-table-responsive">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Ticker</th>
                      <th>Weight</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((d, index) => {
                      return [
                        <tr key={index}>
                          <td>{d.label}</td>
                          <td>{d.ticker}</td>
                          <td>{d.value && d.value.toFixed(2)}%</td>
                          <td>${d.amount && formatCurrency(d.amount.toFixed(2))}</td>
                        </tr>
                      ]
                    })}
                  </tbody>
                </Table>
              </div>
            </Card>
          </Row>
          <Row>
            <Card className="m-2 mt-3 w-100 client-chart">
              <h5 style={{ paddingLeft: '5px', paddingTop: '10px', marginBottom: '-2px' }}>Account growth per month</h5>
              <Chartjs.Line
                height={210}
                data={{
                  labels: clientAssetSize.map(ca => ca.date),
                  datasets: [{
                    label: 'Assets value growth',
                    data: clientAssetSize.map(ca => ca.value),
                    borderWidth: 1,
                    backgroundColor: 'rgba(28,180,255,.05)',
                    borderColor: 'rgba(28,180,255,1)'
                  }]
                }}
                options={{
                  scales: {
                    xAxes: [{
                      gridLines: {
                        display: false
                      },
                      ticks: {
                        fontColor: '#aaa'
                      }
                    }],
                    yAxes: [{
                      gridLines: {
                        display: false
                      },
                      ticks: {
                        fontColor: '#aaa',
                        stepSize: 2000
                      }
                    }]
                  },
                  responsive: true,
                  maintainAspectRatio: false
                }}
              />
            </Card>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.user.accessToken,
  user: state.user.user,
  securities: state.models.securities,
  clientAssetSize: state.user.clientAssetSize,
  clientCumulativeReturn: state.user.clientCumulativeReturn,
  clientAnnualVolume: state.user.clientAnnualVolume,
  clientHoldings: state.user.clientHoldings,
});

const mapDispatchToProps = dispatch => ({
  onGetUser: payload => dispatch(getUser(payload)),
  onGetAllSecurities: payload => dispatch(getAllSecurities(payload)),
  onGetClientAssetSize: payload => dispatch(getClientAssetSize(payload)),
  onGetClientAnnualVolume: payload => dispatch(getClientAnnualVolume(payload)),
  onGetClientCumulativeReturn: payload => dispatch(getClientCumulativeReturn(payload)),
  onGetClientHoldings: payload => dispatch(getClientHoldings(payload)),
  onLogoutUser: payload => dispatch(logoutUser(payload)),
  onSetAccount: payload => dispatch(setAccount(payload)),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientPage);
