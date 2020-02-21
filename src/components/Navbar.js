import React, { Component } from 'react';
import { Navbar, Nav, Dropdown, Button, Form, Modal } from 'react-bootstrap';
import { getUser, getClients, authenticateUser, getAccounts, setAccount } from '../store/actions/index';
import { connect } from 'react-redux';
import avatar1 from '../styles/avatar1.png';
import Select from 'react-select';

class NavbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      disabled: false,
      singleValue: [],
      groupedValue: [],
      options: [],
      accessToken: '',
      selectedOption: '',
      showModal: false
    }
  }
  componentWillMount() {
    const { onGetAccounts } = this.props;
    onGetAccounts();
    this.setState({ accessToken: this.props.accessToken });
  }

  componentDidUpdate(prevProps) {
    if (this.props.accounts !== prevProps.accounts) {
      const { accounts } = this.props;
      this.fillSelectList(accounts);
      this.setState({ accounts });
    }
    if (this.props.accessToken !== prevProps.accessToken) {
      this.setState({ accessToken: this.props.accessToken });
    }
  }

  fillSelectList = (accounts) => {
    const options = accounts.map(acc => { return { value: acc.name, label: acc.name, rating: 'safe', id: acc.id } });
    this.setState({ selectedOption: options[0] });
    this.setState(prevState => ({
      options: [...prevState.options, options]
    }));

    const groupedOptions = [
      {
        label: 'Existing accounts',
        options: options,
      },
      {
        label: 'Create new account',
        options: [
          { value: 'addAccount', label: 'Add new account', rating: 'safe' },
        ],
      },
      {
        label: 'Client',
        options: [
          { value: 'allAccounts', label: 'All accounts', rating: 'safe' },
        ],
      }
    ];

    this.setState(prevState => ({
      groupedValue: [...prevState.groupedValue, groupedOptions]
    }));
  }

  prevent(e) {
    e.preventDefault()
  }

  handleInputChange = (selectedOption) => {
    const { routerHistory, onSetAccount, handleShowAccountName, clearSliders } = this.props;
    const { accounts } = this.state;
    if(clearSliders) clearSliders()
    this.setState({ selectedOption });
    if (selectedOption.value === 'addAccount') {
      routerHistory.push('/add-account');
    } else if (selectedOption.value === 'allAccounts') {
      routerHistory.push('/client');
    }
    else {
      const account = accounts.find(acc => acc.id === selectedOption.id);
      handleShowAccountName(selectedOption.value);
      onSetAccount(account);
      routerHistory.push('/dashboard');
    }
  }

  handleModal = modal => {
    this.setState({ showModal: modal });
  }

  handleConfirm = (modal) => {
    const { onResetClick } = this.props;
    onResetClick();
    this.handleModal(modal);
  } 

  render() {
    const { user, account } = this.props;
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    const { showModal } = this.state;
    let placeholder = ''
    if (window.location.pathname === '/client') {
      placeholder = 'All accounts';
    } else if (window.location.pathname === '/add-account') {
      placeholder = 'Add new account';
    }
    else if (account && account.id) {
      placeholder = account.name;
    }
    return (
      (<Navbar bg='white' expand="lg" className="layout-navbar align-items-lg-center container-p-x">
        <Navbar.Brand href="/dashboard">Hydrogen Demo</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            
          </Nav>
          <span style={{ width: '50%' }} className='navbar-text'>
            <Select className="react-select" classNamePrefix="react-select"
              placeholder={placeholder}
              options={this.state.groupedValue[0]}
              onChange={this.handleInputChange}
              isClearable={false}
              isSearchable={false}
              isDisabled={this.state.disabled} />

          </span>
          <Dropdown as={Nav.Item} className="demo-navbar-user" alignRight={!isRTL}>
            <Dropdown.Toggle as={Nav.Link}>
              <span className="d-inline-flex flex-lg-row-reverse align-items-center align-middle">
                <img src={avatar1} className="d-block ui-w-30 rounded-circle" alt="User" />
                <span className="px-1 mr-lg-2 ml-2 ml-lg-0">{user && user.first_name}</span>
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
            <Dropdown.Item onClick={this.props.onLogoutClick} ><i className="ion ion-ios-log-out text-danger"></i> &nbsp; Log Out</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item id='item-delete-all' onClick={() => this.handleModal(true)} ><i className="ion ion-ios-log-out text-danger"></i> &nbsp; Log Out and reset</Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
        <Modal centered show={showModal} onHide={() => this.handleModal(false)}>
              <Form>
              <Modal.Header closeButton>
                <Modal.Title className="text-danger">Warning!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  If you confirm, all data in app will be deleted and you will be redirected to initialization.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => this.handleModal(false)}>
                  Close
                </Button>
                <Button variant="danger" onClick={() => this.handleConfirm(false)}>
                  Confirm
                </Button>
              </Modal.Footer>
              </Form>
            </Modal>
      </Navbar>
      )
    )
  }
}
const mapStateToProps = state => ({
  accessToken: state.user.accessToken,
  userAccessToken: state.user.userAccessToken,
  username: state.user.username,
  accounts: state.accounts.accounts,
  account: state.accounts.account
});

const mapDispatchToProps = dispatch => ({
  onGetUser: payload => dispatch(getUser(payload)),
  onGetClients: payload => dispatch(getClients(payload)),
  onAuthenticateUser: payload => dispatch(authenticateUser(payload)),
  onGetAccounts: payload => dispatch(getAccounts(payload)),
  onSetAccount: payload => dispatch(setAccount(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarComponent);