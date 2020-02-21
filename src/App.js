import React, { Component } from 'react';
import { connect } from 'react-redux';


import Initializer from './Initializer';
import './App.css';
import { setAccessToken } from './store/actions';
import SpinnerComponent from './components/SpinnerComponent';
import { Redirect } from 'react-router-dom';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: '',
      isAccountExists: false,
      isComponentMounted: false
    };
  }
  async componentWillMount() {
    const { getAccessToken, isInitalized } = Initializer;
    const response = await getAccessToken();

    this.setState({ accessToken: response.data.access_token });
    localStorage['accessToken'] = response.data.access_token;
    const res = await isInitalized(response.data.access_token);
    for (const account of res.data.content) {
      if (account && account.id) {
        this.setState({ isAccountExists: true });
      }
    }

    this.setState({ isComponentMounted: true });
  }


  render() {
    const { isAccountExists, accessToken, isComponentMounted } = this.state;
    if (accessToken === '' || !isComponentMounted) {
      return (
        <SpinnerComponent />
      )
    } else {
      return (
        !isAccountExists ?
          <Redirect to='/initialize' />
          :
          <Redirect to='/login' />
      )
    }
  }
}

const mapStateToProps = state => ({
  accessToken: state.user.accessToken
});

const mapDispatchToProps = dispatch => ({
  setAccessToken: payload => dispatch(setAccessToken(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);