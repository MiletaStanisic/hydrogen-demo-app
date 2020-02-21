
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store/store';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import history from './history';
import Auth from './auth';

import './index.css';
import App from './App';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import InitPage from './pages/InitPage';
import AddAccount from './pages/AddAccount';
import ErrorBoundary from './ErrorBoundary';
import RequestCheckerComponent from './pages/RequestCheckerComponent';
import ClientPage from './pages/ClientPage';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    Auth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
  )} />
)
const app = (
  <ErrorBoundary>
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/client" component={ClientPage} />
          <Route exact path="/initialize" component={InitPage} />
          <Route exact path="/checkrequests" component={RequestCheckerComponent} />
          <PrivateRoute exact path="/add-account" component={AddAccount} />
        </Switch>
      </Router>
    </Provider>
  </ErrorBoundary>

)

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
