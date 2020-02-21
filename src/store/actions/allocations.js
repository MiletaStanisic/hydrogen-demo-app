import * as actionTypes from './actionTypes'
import axios from 'axios';
import { BASE_PATH } from '../../configuration';

export const getAllocationSuccess = (res) => {
  return {
    type: actionTypes.GET_ALLOCATION_SUCCESS,
    allocation: res.data
  }
}

export const getAllocationFail = (error) => {
  return {
    type: actionTypes.GET_ALLOCATION_FAIL,
    error: error
  }
}

export const getAllocationStart = () => {
  return {
    type: actionTypes.GET_ALLOCATION_START
  }
}

export const getAllocation = payload => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  dispatch(getAllocationStart())
  axios({
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}allocation/${payload}`
  })
    .then(res => {
      dispatch(getAllocationSuccess(res));
    })
    .catch(err => dispatch(getAllocationFail(err)))
}

export const getAllocationPerformanceFail = (error) => {
  return {
    type: actionTypes.GET_ACCOUNT_ALLOCATION_FAIL,
    error: error
  }
}

export const getAllocationPerformanceStart = () => {
  return {
    type: actionTypes.GET_ACCOUNT_ALLOCATION_START
  }
}

export const getAllocationPerformanceSuccess = (res) => {
  return {
    type: actionTypes.GET_ACCOUNT_ALLOCATION_SUCCESS,
    allocationPerformance: res.data
  }
}

export const getAllocationPerformance = payload => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  dispatch(getAllocationPerformanceStart())
  axios({
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}allocation/${payload}/performance?stat=monte_carlo`
  })
    .then(res => {
      dispatch(getAllocationPerformanceSuccess(res));
    })
    .catch(err => dispatch(getAllocationPerformanceFail(err)))
}

export const getAllocationCompositionFail = (error) => {
  return {
    type: actionTypes.GET_ALLOCATION_COMPOSITION_FAIL,
    error: error
  }
}

export const getAllocationCompositionStart = () => {
  return {
    type: actionTypes.GET_ALLOCATION_COMPOSITION_START
  }
}

export const getAllocationCompositionSuccess = (res) => {
  return {
    type: actionTypes.GET_ALLOCATION_COMPOSITION_SUCCESS,
    allocationComposition: res.data.content[0]
  }
}

export const getAllocationComposition = payload => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  dispatch(getAllocationCompositionStart())
  axios({
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}allocation_composition?filter=allocation_id==${payload}`
  })
    .then(res => {
      dispatch(getAllocationCompositionSuccess(res));
    })
    .catch(err => dispatch(getAllocationCompositionFail(err)))
}