import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Form, InputGroup, Modal, FormControl } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input';
import { Account } from './Tabs'
import Navbar from '../components/Navbar';
import SpinnerComponent from '.././components/SpinnerComponent';
import Auth from '../auth';
import Initializer from '../Initializer';
import { dates } from '../configuration'
import { debounce } from './helpers'
import {
  getAccountPortifolioHoldings,
  createPortifolioTransaction,
  getClientCumulativeReturn,
  createPortifolioAssetSize,
  getAllocationComposition,
  getAllocationPerformance,
  createPortfolioHoldingg,
  subscribeAccountClear,
  getClientAnnualVolume,
  getAccountPortifolio,
  getAccountAllocation,
  getTransactionCodes,
  getClientAssetSize,
  getGoalProjectons,
  getClientHoldings,
  getModelHoldings,
  getAllSecurities,
  authenticateUser,
  createFunding,
  retrieveModel,
  getAllocation,
  accountsClear,
  getAccounts,
  setAccount,
  getFunding,
  getClients,
  logoutUser,
  getGoal,
  getUser,
  setDate
} from '../store/actions/index'
import '../styles/element/css/element.css'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: '',
      accountGoal: {},
      price: null,
      fundingsForAccount: null,
      selectedTab: 'client',
      accounts: [],
      selectedAccount: {},
      isDeleting: false,
      currentBalance: null,
      assetSize: null,
      accountName: '',
      usableDates: [],
      monthlyDepositSlider: null,
      curInventorySlider: null,
      currentAccountInventory: null,
      ammount: null
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  componentDidUpdate(prevProps) {
    const {
      accounts,
      account,
      accountPortifolioHoldings,
      accountPortifolio,
      onGetAccountPortifolioHoldings,
      user,
      clientHoldings,
      onGetClientAssetSize,
      porfolioHolding,
      onGetAllocation,
      accountAllocation,
      onGetAccountPortifolio,
      onGetModelHoldings,
      onGetGoal,
      onGetAccountAllocation,
      onSetAccount,
      onGetFunding,
    } = this.props;

    if (accounts !== prevProps.accounts) {
      if (!account.id) onSetAccount(accounts[0]);
    }

    if (account && account.id && account !== prevProps.account) {
      if (account && account.id && account.goals.length > 0)
        onGetGoal(account.goals[0].goal_id);
      onGetAccountAllocation(account.id);
      onGetFunding(account.id);
      onGetAccountPortifolio({ accountId: account.id });
      onGetAccountPortifolioHoldings(account.id);
      this.runGoalProjection({});
    }

    if (porfolioHolding !== prevProps.porfolioHolding) {
      onGetClientAssetSize(user.id);
    }
    if (accountPortifolioHoldings !== prevProps.accountPortifolioHoldings && accountPortifolioHoldings.length > 0) {
      const currentAccountInventory = accountPortifolioHoldings.map(aph => aph.amount).reduce((prev, next) => prev + next);
      this.setState({ currentAccountInventory })
    }

    if (clientHoldings !== prevProps.clientHoldings) {
      this.setState({ currentInventory: clientHoldings.map(item => item.amount).reduce((prev, next) => prev + next) })
    }

    if (accountAllocation !== prevProps.accountAllocation) {
      onGetAllocation(accountAllocation.allocation_id);
    }

    if (accountPortifolio !== prevProps.accountPortifolio && accountPortifolio && accountPortifolio.model_id) {
      onGetModelHoldings(accountPortifolio.model_id);
    }
  }

  componentDidMount() {
    const {
      onClearSubscription,
      account,
      onGetAccountAllocation,
      user,
      onGetGoal,
      onGetFunding,
      onGetAccountPortifolio,
      onGetAccountPortifolioHoldings,
      onGetUser,
      onGetAllSecurities
    } = this.props;

    onClearSubscription();

    if (account && account.id) {
      if (account && account.id && account.goals.length > 0)
        onGetGoal(account.goals[0].goal_id);

      onGetAccountAllocation(account.id);
      onGetFunding(account.id);
      onGetAccountPortifolio({ accountId: account.id });
      onGetAccountPortifolioHoldings(account.id);
    }

    const username = localStorage.getItem("username");
    if (!user.id) onGetUser({ username: username });
    onGetAllSecurities();
  }

  handleShowAccountName = (name) => {
    this.setState({ accountName: name })
  }

  clearSliders = () => {
    this.setState({ monthlyDepositSlider: null, curInventorySlider: null })
  }

  cutUsableDates = () => {
    const { accountPortifolioHoldings } = this.props;
    const lastDate = accountPortifolioHoldings[0].date.substring(0, 10);
    const lastDateIndex = dates.findIndex(d => d === lastDate);
    const sliceIndex = lastDateIndex - dates.length + 1;
    const usableDates = dates.slice(sliceIndex);
    return usableDates;
  }

  getDate = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const today = new Date();
    let date = {};
    date.day = today.getDate();
    date.month = monthNames[today.getMonth()];
    date.year = today.getFullYear();
    return date;
  }


  handleModal = modal => {
    this.setState({ showModal: modal });
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
    this.setState({ isDeleting: false })
    onSetAccount({});
  }

  onLogoutClick = () => {
    const { onLogoutUser } = this.props;
    Auth.signout(() => {
      this.props.history.push('/login');
      onLogoutUser();
    })
  }

  buyShares = () => {
    const { modelHoldings, portfolio, clientAssetSize, onGetAccountPortifolioHoldings, account, onCreatePortfolioHolding, transactionCodes, onCreatePortifolioTransaction, accountPortifolio, onCreatePortifolioAssetSize } = this.props;
    let { price } = this.state;
    const currentBalance = clientAssetSize.slice(-1)[0].value
    const usableDates = this.cutUsableDates();
    for (const mh of modelHoldings) {
      const amount = price * (mh.current_weight / 100);
      const payload = {
        amount: amount,
        shares: amount / 10,
        date: usableDates[0],
        weight: mh.current_weight,
        security_id: mh.security_id,
        portfolio_id: portfolio.id
      }
      onCreatePortfolioHolding(payload)
      let buyTransactionCode;
      if (transactionCodes && transactionCodes.length > 0) buyTransactionCode = transactionCodes.find(tc => tc.transaction_code === "BUY")
      onCreatePortifolioTransaction({ quantity: amount / 10, price: amount, portfolioId: accountPortifolio.id, securityId: mh.security_id, transactionCode: buyTransactionCode.id, modelId: mh.model_id })
    }
    onCreatePortifolioAssetSize({ assetSize: currentBalance + price, cashFlow: currentBalance + price, portfolioId: accountPortifolio.id, date: usableDates[0] })

    onGetAccountPortifolioHoldings(account.id);
    this.handleModal('')
  }

  handleOpenModal = () => {
    const { user, onGetClientAssetSize, onGetTransactionCodes } = this.props;
    this.clearSliders()
    onGetClientAssetSize(user.id);
    onGetTransactionCodes();
    this.handleModal('buyStocks')
  }

  handleGetValue = (e, maskedvalue, floatvalue) => {
    this.setState({ ammount: maskedvalue });
    this.setState({ price: floatvalue });
  }

  runGoalProjection = sliderData => {
    const { monthlyDeposit, curInventory } = sliderData;
    const { monthlyDepositSlider, curInventorySlider, currentAccountInventory } = this.state;
    const { allocation, account, funding } = this.props;
    const monthlyFunding = funding.length > 0 ? funding.find(f => f.frequency_unit === 'monthly').amount : null;
    if (monthlyDeposit) {
      this.setState({ monthlyDepositSlider: monthlyDeposit })
    }
    if (curInventory)
      this.setState({ curInventorySlider: curInventory })

    const payload = {
      pRet: [allocation.performance],
      pRisk: [allocation.volatility],
      horizon: account.goals[0].accumulation_horizon || account.goals[0].decumulation_horizon,
      goalAmount: account.goals[0].goal_amount,
      depositAmount: monthlyDepositSlider || monthlyFunding,
      goalType: account.goals[0].accumulation_horizon ? 'goal_accumulation' : 'goal_decumulation',
      currentInventory: curInventorySlider || currentAccountInventory
    }

    this.getProjections(payload);
  }

  getProjections = debounce((payload) => {
    const { onGetGoalProjectons } = this.props;
    onGetGoalProjectons(payload);
  }, 600);

  render() {
    const {
      history,
      account,
      onGetAllocation,
      allocation,
      user,
      accountAllocation,
      goal,
      modelHoldings,
      clientAssetSize,
      securities,
      clientHoldings,
      onGetClientHoldings,
      goalProjection,
      accountPortifolioHoldings,
      funding,
      accountSubscription,
      onClearSubscription
    } = this.props;
    const { showModal, currentAccountInventory, isDeleting, currentBalance, monthlyDepositSlider, curInventorySlider } = this.state;
    if (accountAllocation && accountAllocation.id && !allocation.id) onGetAllocation(accountAllocation.allocation_id);

    const monthlyFunding = funding.length > 0 ? funding.find(f => f.frequency_unit === 'monthly').amount : 0;
    if (!currentAccountInventory && accountPortifolioHoldings.length > 0) {
      const currentAccountInventory = accountPortifolioHoldings.map(aph => aph.amount).reduce((prev, next) => prev + next);
      this.setState({ currentAccountInventory })
    }
    if (allocation.id && account.id && clientHoldings.length > 0 && !goalProjection.current_status) this.runGoalProjection({});

    if (clientHoldings.length === 0) onGetClientHoldings(user.id);
    if (accountSubscription.id) {
      onClearSubscription();
      this.runGoalProjection({})
    }

    return (
      isDeleting ? <SpinnerComponent /> :

        (<div className="dashboard-container">
          <Navbar
            handleShowAccountName={(name) => this.handleShowAccountName(name)}
            onResetClick={this.onResetClick} user={user} routerHistory={history}
            onLogoutClick={this.onLogoutClick}
            clearSliders={this.clearSliders}
          />
          <div className="container">
            <div className="page-header-dashboard">
              <h4 className="font-weight-light selected-account-dashboard">{(account && account.id) && account.name}</h4>
              <Button className="button-buy-stocks-dashboard" onClick={this.handleOpenModal} variant="primary">Make investment</Button>
            </div>

            <Account
              goal={goal}
              account={account}
              funding={funding}
              goalProjection={goalProjection}
              currentAccountInventory={currentAccountInventory}
              currentBalance={currentBalance}
              modelHoldings={modelHoldings}
              monthlyFunding={monthlyFunding}
              clientAssetSize={clientAssetSize}
              prevent={this.prevent}
              allocation={allocation}
              monthlyDepositSlider={monthlyDepositSlider}
              curInventorySlider={curInventorySlider}
              securities={securities}
              runGoalProjection={this.runGoalProjection}
            />
            <Modal centered show={showModal === 'buyStocks'} onHide={() => this.handleModal('')}>
              <Form>
                <Modal.Header>
                  <Modal.Title> <h4>Enter price</h4>
                    <h6 className="text-danger">Prices of securities are fixed for the purposeses of this demo.</h6>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>{securities.map((sec, index) => {
                  return (
                    < InputGroup key={index} className="mb-3" >
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-default">{sec.name}</InputGroup.Text>
                        <InputGroup.Text>$</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        value={10}
                        disabled
                        name={sec.id}
                        onChange={this.handleGetValue}
                        type='number'
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                      />
                    </InputGroup>
                  )
                })}
                  < InputGroup className="mb-3" >
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-default">Enter value</InputGroup.Text>
                      <InputGroup.Text>$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <CurrencyInput
                      className="form-control"
                      precision={0}
                      thousandSeparator=','
                      decimalSeparator='.'
                      value={this.state.price}
                      onChangeEvent={this.handleGetValue}
                    />
                  </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => this.handleModal('')}>
                    Close
                </Button>
                  <Button variant="primary" onClick={this.buyShares}>
                    Save
                </Button>
                </Modal.Footer>
              </Form>
            </Modal>
          </div>
        </div>)
    )
  }
}

const mapStateToProps = state => ({
  accessToken: state.user.accessToken,
  userAccessToken: state.user.userAccessToken,
  username: state.user.username,
  user: state.user.user,
  securities: state.models.securities,
  account: state.accounts.account,
  goal: state.goals.goal,
  goalPerformance: state.goals.goalPerformance,
  allocation: state.allocations.allocation,
  clientAssetSize: state.user.clientAssetSize,
  model: state.models.model,
  portfolio: state.accounts.accountPortifolio,
  accountAllocation: state.accounts.accountAllocation,
  modelHoldings: state.models.modelHoldings,
  allocationPerformance: state.allocations.allocationPerformance,
  allocationComposition: state.allocations.allocationComposition,
  clientCumulativeReturn: state.user.clientCumulativeReturn,
  clientAnnualVolume: state.user.clientAnnualVolume,
  clientHoldings: state.user.clientHoldings,
  accountPortifolio: state.accounts.accountPortifolio,
  accounts: state.accounts.accounts,
  porfolioHolding: state.accounts.porfolioHolding,
  funding: state.funding.funding,
  date: state.accounts.date,
  transactionCodes: state.funding.transactionCodes,
  accountSubscription: state.accounts.accountSubscription,
  goalProjection: state.goals.goalProjection,
  accountPortifolioHoldings: state.accounts.accountPortifolioHoldings
});

const mapDispatchToProps = dispatch => ({
  onGetUser: payload => dispatch(getUser(payload)),
  onGetClients: payload => dispatch(getClients(payload)),
  onAuthenticateUser: payload => dispatch(authenticateUser(payload)),
  onGetAllSecurities: payload => dispatch(getAllSecurities(payload)),
  onGetAccounts: payload => dispatch(getAccounts(payload)),
  onGetGoal: payload => dispatch(getGoal(payload)),
  onGetAccountPortifolio: payload => dispatch(getAccountPortifolio(payload)),
  onGetClientAssetSize: payload => dispatch(getClientAssetSize(payload)),
  onRetrieveModel: payload => dispatch(retrieveModel(payload)),
  onGetModelHoldings: payload => dispatch(getModelHoldings(payload)),
  onCreatePortfolioHolding: payload => dispatch(createPortfolioHoldingg(payload)),
  onGetAllocation: payload => dispatch(getAllocation(payload)),
  onGetAccountAllocation: payload => dispatch(getAccountAllocation(payload)),
  onGetAllocationPerformance: payload => dispatch(getAllocationPerformance(payload)),
  onGetClientAnnualVolume: payload => dispatch(getClientAnnualVolume(payload)),
  onGetClientCumulativeReturn: payload => dispatch(getClientCumulativeReturn(payload)),
  onGetClientHoldings: payload => dispatch(getClientHoldings(payload)),
  onGetAllocationComposition: payload => dispatch(getAllocationComposition(payload)),
  onCreateFunding: payload => dispatch(createFunding(payload)),
  onGetFunding: payload => dispatch(getFunding(payload)),
  onCreatePortifolioAssetSize: payload => dispatch(createPortifolioAssetSize(payload)),
  onSetAccount: payload => dispatch(setAccount(payload)),
  onGetGoalProjectons: payload => dispatch(getGoalProjectons(payload)),
  onSetDate: payload => dispatch(setDate(payload)),
  onCreatePortifolioTransaction: payload => dispatch(createPortifolioTransaction(payload)),
  onGetTransactionCodes: payload => dispatch(getTransactionCodes(payload)),
  onGetAccountPortifolioHoldings: payload => dispatch(getAccountPortifolioHoldings(payload)),
  onLogoutUser: payload => dispatch(logoutUser(payload)),
  onClearSubscription: payload => dispatch(subscribeAccountClear(payload)),
  onClearAccounts: payload => dispatch(accountsClear(payload)),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
