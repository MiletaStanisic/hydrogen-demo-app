import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap'
import { Redirect } from 'react-router'
import '../styles/login.scss'
import Auth from '../auth';

import { authenticateUser, setDate } from '../store/actions/index'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      credentials: {
        username: '',
        password: '',
        rememberMe: false,
        redirectToReferrer: false,
        invalidCredentials: false,
        userAccessToken: ''
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.userAccessToken !== prevProps.userAccessToken) {
      const { userAccessToken } = this.props;
      this.setState({ userAccessToken });
    }
  }

  onValueChange(field, e) {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [field]: field === 'rememberMe' ? e.target.checked : e.target.value
      }
    })
    this.setState({ invalidCredentials: false });
  }

  prevent(e) {
    e.preventDefault()
  }

  login = () => {
    const { username, password } = this.state.credentials;
    const { onSetDate, onAuthenticateUser } = this.props;
    const { userAccessToken } = this.state;

    Auth.authenticate(userAccessToken, username, async () => {
      onAuthenticateUser({ username, password })
        .then((res) => {
          if (res && res.type === "AUTHENTICATE_USER_FAIL") {
            this.setState({ invalidCredentials: true });
          }
        })
      this.setState({ redirectToReferrer: true });
    });

    onSetDate('2020-02-03');
  }


  render() {
    const { user, initialState } = this.props;
    const userAccessToken = localStorage.getItem('userAccessToken');

    const { from } = this.props.location.state || { from: { pathname: '/dashboard' } };
    const { invalidCredentials } = this.state;
    const client = initialState.clients[0];
    if (userAccessToken && user && user.id && Auth.isAuthenticated) {
      return <Redirect to={from} />;
    }
    return (
      <div className="authentication-wrapper authentication-3">
        <div className="authentication-inner">
          <div className="d-none d-lg-flex col-lg-8 align-items-center ui-bg-cover ui-bg-overlay-container p-5" style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/img/bg/21.jpg')` }}>
            <div className="ui-bg-overlay bg-dark opacity-50"></div>

            <div className="w-100 text-white px-5">
              <h1 className="display-2 font-weight-bolder mb-4">ENABLING FINTECH<br />INOVATION</h1>
              <div className="text-large font-weight-light">
                Quickly add digital financial components to your business using ONE integrated platform.
              </div>
            </div>

          </div>

          <div className="d-flex col-lg-4 align-items-center bg-white p-5">
            <div className="d-flex col-sm-7 col-md-5 col-lg-12 px-0 px-xl-4 mx-auto">
              <div className="w-100">

                <div className="d-flex justify-content-center align-items-center">
                  <div className="ui-w-60">
                    <div className="w-100 position-relative" style={{ paddingBottom: '54%' }}>
                      <svg className="w-100 h-100 position-absolute" viewBox="0 0 148 80" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><defs><linearGradient id="a" x1="46.49" x2="62.46" y1="53.39" y2="48.2" gradientUnits="userSpaceOnUse"><stop stopOpacity=".25" offset="0"></stop><stop stopOpacity=".1" offset=".3"></stop><stop stopOpacity="0" offset=".9"></stop></linearGradient><linearGradient id="e" x1="76.9" x2="92.64" y1="26.38" y2="31.49" xlinkHref="#a"></linearGradient><linearGradient id="d" x1="107.12" x2="122.74" y1="53.41" y2="48.33" xlinkHref="#a"></linearGradient></defs><path className="fill-primary" transform="translate(-.1)" d="M121.36,0,104.42,45.08,88.71,3.28A5.09,5.09,0,0,0,83.93,0H64.27A5.09,5.09,0,0,0,59.5,3.28L43.79,45.08,26.85,0H.1L29.43,76.74A5.09,5.09,0,0,0,34.19,80H53.39a5.09,5.09,0,0,0,4.77-3.26L74.1,35l16,41.74A5.09,5.09,0,0,0,94.82,80h18.95a5.09,5.09,0,0,0,4.76-3.24L148.1,0Z"></path><path transform="translate(-.1)" d="M52.19,22.73l-8.4,22.35L56.51,78.94a5,5,0,0,0,1.64-2.19l7.34-19.2Z" fill="url(#a)"></path><path transform="translate(-.1)" d="M95.73,22l-7-18.69a5,5,0,0,0-1.64-2.21L74.1,35l8.33,21.79Z" fill="url(#e)"></path><path transform="translate(-.1)" d="M112.73,23l-8.31,22.12,12.66,33.7a5,5,0,0,0,1.45-2l7.3-18.93Z" fill="url(#d)"></path></svg>
                    </div>

                  </div>
                </div>

                <h4 className="text-center text-lighter font-weight-normal mt-5 mb-0">Login to Your Account</h4>

                <form className="my-5">
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control className={invalidCredentials ? `invalid-login-input` : ``} value={this.state.credentials.username} onChange={e => this.onValueChange('username', e)} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="d-flex justify-content-between align-items-end">
                      <div>Password</div>
                      {/* <a href="#d" onClick={this.prevent} className="d-block small">Forgot password?</a> */}
                    </Form.Label>
                    <Form.Control className={invalidCredentials ? `invalid-login-input` : ``} type="password" value={this.state.credentials.password} onChange={e => this.onValueChange('password', e)} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Default credentials</Form.Label> <br />
                    <span>Username: {client.email}</span><br />
                    <span>Password: {client.password}</span><br />
                  </Form.Group>
                  <div className="d-flex justify-content-between align-items-center m-0">
                    {/* <Form.Check type="checkbox" custom checked={this.state.credentials.rememberMe} onChange={e => this.onValueChange('rememberMe', e)} label="Remember me" className="m-0" id="login-remember-me" /> */}
                    <Button onClick={() => this.login()} variant="primary">Sign In</Button>
                  </div>
                </form>


              </div>
            </div>
          </div>


        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userAccessToken: state.user.userAccessToken,
  user: state.user.user,
  initialState: state.updateState,
  loading: state.user.loading
});

const mapDispatchToProps = dispatch => ({
  onAuthenticateUser: payload => dispatch(authenticateUser(payload)),
  onSetDate: payload => dispatch(setDate(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);