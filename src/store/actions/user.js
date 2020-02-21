import * as actionTypes from './actionTypes'
import axios from 'axios';
import { CLIENT_CREDENTIALS, AUTH_PATH, BASE_PATH } from '../../configuration';

export const setAccessToken = (payload) => {
  return {
    type: actionTypes.SET_ACCESS_TOKEN,
    accessToken: payload,
  }
}

export const setClientAssetSize = (payload) => {
  return {
    type: actionTypes.SET_CLIENT_ASSET_SIZE,
    clientAssetSize: [],
  }
}

export const authenticateUserSuccess = (res) => {
  return {
    type: actionTypes.AUTHENTICATE_USER_SUCCESS,
    accessToken: res.data.access_token,
    username: res.username
  }
}

export const authenticateUserFail = (error) => {
  return {
    type: actionTypes.AUTHENTICATE_USER_FAIL,
    error: error
  }
}

export const authenticateUserStart = () => {
  return {
    type: actionTypes.AUTHENTICATE_USER_START
  }
}

export const authenticateUser = payload => async (dispatch, getState) => {
  const { username, password } = payload;
  const client_credentials = window.btoa(CLIENT_CREDENTIALS);
  const headers = {
    'Authorization': `Basic ${client_credentials}`
  };
  const options = {
    url: `${AUTH_PATH}=password&username=${username}&password=${password}`,
    method: 'POST',
    headers: headers
  };
  dispatch(authenticateUserStart())
  const promise = await axios
    .request(options, (err) => {
      if (err) dispatch(authenticateUserFail(err));
    })
    .then(res => {
      res.username = username;
      localStorage['userAccessToken'] = res.data.access_token;
      localStorage['username'] = username;
      dispatch(authenticateUserSuccess(res));
      dispatch(getUser({ username, accessToken: res.data.access_token }));
    })
    .catch(err => dispatch(authenticateUserFail(err)));
  return promise;
}

export const logoutUser = payload => (dispatch, getState) => {
  dispatch({
    user: '',
    type: actionTypes.REMOVE_USER
  })
}

export const getUserSuccess = (res) => {
  return {
    type: actionTypes.GET_USER_SUCCESS,
    user: res.data.content[0]
  }
}

export const getUserFail = (error) => {
  return {
    type: actionTypes.GET_USER_FAIL,
    error: error
  }
}

export const getUserStart = () => {
  return {
    type: actionTypes.GET_USER_START
  }
}

export const getUser = payload => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  const { username } = payload;
  dispatch(getUserStart())
  axios({
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}client`,
    params: { "filter": `username==${username}` }
  })
    .then(res => {
      dispatch(getUserSuccess(res));
    })
    .catch(err => dispatch(getUserFail(err)))
}

export const getClientsSuccess = (res) => {
  return {
    type: actionTypes.GET_CLIENTS_SUCCESS,
    accessToken: res.data.access_token
  }
}

export const getClientsFail = (error) => {
  return {
    type: actionTypes.GET_CLIENTS_FAIL,
    error: error
  }
}

export const getClientsStart = () => {
  return {
    type: actionTypes.GET_CLIENTS_START
  }
}

export const getClients = payload => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  dispatch(getClientsStart())
  axios({
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}client`,
  })
    .then(res => {
      dispatch(getClientsSuccess(res));
    })
    .catch(err => dispatch(getClientsFail(err)))

}

export const getClientAssetSizeSuccess = (res) => {
  return {
    type: actionTypes.GET_CLIENT_ASSET_SIZE_SUCCESS,
    clientAssetSize: res.data
  }
}

export const getClientAssetSizeFail = (error) => {
  return {
    type: actionTypes.GET_CLIENT_ASSET_SIZE_FAIL,
    error: error
  }
}

export const getClientAssetSizeStart = () => {
  return {
    type: actionTypes.GET_CLIENT_ASSET_SIZE_START
  }
}

export const getClientAssetSize = payload => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  dispatch(getClientAssetSizeStart())
  axios({
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}client/${payload}/asset_size`
  })
    .then(res => {
      dispatch(getClientAssetSizeSuccess(res));
    })
    .catch(err => dispatch(getClientAssetSizeFail(err)))
}

export const getClientAnnualVolumeSuccess = (res) => {
  return {
    type: actionTypes.GET_CLIENT_ANN_VOLUME_SUCCESS,
    clientAnnualVolume: res.data
  }
}

export const getClientAnnualVolumeFail = (error) => {
  return {
    type: actionTypes.GET_CLIENT_ANN_VOLUME_FAIL,
    error: error
  }
}

export const getClientAnnualVolumeStart = () => {
  return {
    type: actionTypes.GET_CLIENT_ANN_VOLUME_START
  }
}

export const getClientAnnualVolume = payload => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  dispatch(getClientAnnualVolumeStart())
  axios({
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}client/${payload}/performance?stat=ann_vol`
  })
    .then(res => {
      dispatch(getClientAnnualVolumeSuccess(res));
    })
    .catch(err => dispatch(getClientAnnualVolumeFail(err)))
}

export const getClientCumulativeReturnSuccess = (res) => {
  return {
    type: actionTypes.GET_CLIENT_CUM_RETURN_SUCCESS,
    clientCumulativeReturn: res.data
  }
}

export const getClientCumulativeReturnFail = (error) => {
  return {
    type: actionTypes.GET_CLIENT_CUM_RETURN_FAIL,
    error: error
  }
}

export const getClientCumulativeReturnStart = () => {
  return {
    type: actionTypes.GET_CLIENT_CUM_RETURN_START
  }
}

export const getClientCumulativeReturn = payload => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  dispatch(getClientCumulativeReturnStart())
  axios({
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}client/${payload}/performance?stat=cum_return`
  })
    .then(res => {
      dispatch(getClientCumulativeReturnSuccess(res));
    })
    .catch(err => dispatch(getClientCumulativeReturnFail(err)))
}

export const getClientHoldingsSuccess = (res) => {
  return {
    type: actionTypes.GET_CLIENT_HOLDING_SUCCESS,
    clientHoldings: res.data
  }
}

export const getClientHoldingsFail = (error) => {
  return {
    type: actionTypes.GET_CLIENT_HOLDING_FAIL,
    error: error
  }
}

export const getClientHoldingsStart = () => {
  return {
    type: actionTypes.GET_CLIENT_HOLDING_START
  }
}

export const getClientHoldings = payload => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  dispatch(getClientHoldingsStart())
  axios({
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}client/${payload}/holding?order_by=date`,
  })
    .then(res => {
      dispatch(getClientHoldingsSuccess(res));
    })
    .catch(err => dispatch(getClientHoldingsFail(err)))
}