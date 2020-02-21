import * as actionTypes from './actionTypes'
import axios from 'axios';
import { BASE_PATH } from '../../configuration';

export const retrieveModelSuccess = (res) => {
  return {
    type: actionTypes.RETRIEVE_MODEL_SUCCESS,
    model: res.data
  }
}

export const retrieveModelFail = (error) => {
  return {
    type: actionTypes.RETRIEVE_MODEL_FAIL,
  }
}

export const retrieveModelStart = () => {
  return {
    type: actionTypes.RETRIEVE_MODEL_START
  }
}


export const retrieveModel = payload => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  const { model_id } = payload;
  dispatch(retrieveModelStart())
  axios({
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}model/${model_id}`,
  })
    .then(res => {
      dispatch(retrieveModelSuccess(res));
    })
    .catch(err => dispatch(retrieveModelFail(err)))
}


export const getModelHoldingsSuccess = (res) => {
  return {
    type: actionTypes.GET_MODEL_HOLDINGS_SUCCESS,
    modelHoldings: res.data.content
  }
}

export const getModelHoldingsFail = (error) => {
  return {
    type: actionTypes.GET_MODEL_HOLDINGS_FAIL,
    error: error
  }
}

export const getModelHoldingsStart = () => {
  return {
    type: actionTypes.GET_MODEL_HOLDINGS_START
  }
}

export const getModelHoldings = payload => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  dispatch(getModelHoldingsStart())
  axios({
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}model_holding`,
    params: {
      "filter": `model_id==${payload}`
    }
  })
    .then(res => {
      dispatch(getModelHoldingsSuccess(res));
    })
    .catch(err => dispatch(getModelHoldingsFail(err)))
}

export const getAllSecuritiesSuccess = (res) => {
  return {
    type: actionTypes.GET_ALL_SECURITIES_SUCCESS,
    securities: res.data.content
  }
}

export const getAllSecuritiesFail = (error) => {
  return {
    type: actionTypes.GET_ALL_SECURITIES_FAIL,
  }
}

export const getAllSecuritiesStart = () => {
  return {
    type: actionTypes.GET_ALL_SECURITIES_START
  }
}


export const getAllSecurities = payload => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  dispatch(getAllSecuritiesStart())
  axios({
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}security`,
  })
    .then(res => {
      dispatch(getAllSecuritiesSuccess(res));
    })
    .catch(err => dispatch(getAllSecuritiesFail(err)))
}