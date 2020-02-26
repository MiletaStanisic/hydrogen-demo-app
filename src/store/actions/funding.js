import * as actionTypes from './actionTypes'
import axios from 'axios';
import { BASE_PATH } from '../../configuration';

export const getFundingSuccess = (res) => {
  return {
    type: actionTypes.GET_FUNDING_SUCCESS,
    funding: res.data.content
  }
}

export const getFundingFail = (error) => {
  return {
    type: actionTypes.GET_FUNDING_FAIL,
    error: error
  }
}

export const getFundingStart = () => {
  return {
    type: actionTypes.GET_FUNDING_START
  }
}

export const getFunding = payload => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  dispatch(getFundingStart())
  axios({
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}funding`,
    params: {
      "filter": `account_id==${payload}`
    }
  })
    .then(res => {
      dispatch(getFundingSuccess(res));
    })
    .catch(err => dispatch(getFundingFail(err)))
}

export const createFundingSuccess = (res) => {
  return {
    type: actionTypes.CREATE_FUNDING_SUCCESS,
    funding: res.data
  }
}

export const createFundingFail = (error) => {
  return {
    type: actionTypes.CREATE_FUNDING_FAIL,
    error: error
  }
}

export const createFundingStart = () => {
  return {
    type: actionTypes.CREATE_FUNDING_START
  }
}

export const createFunding = payload => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  const { amount, accountId, frequencyUnit } = payload
  let today = new Date();
  today.toISOString().substring(0, 10);
  dispatch(createFundingStart())
  axios({
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}funding`,
    data: {
      amount: amount,
      account_id: accountId,
      frequency_unit: frequencyUnit || "one_time",
      start_date: today,
      is_active: true,
      is_deposit: true,
      funding_type: "cash",
      funding_status: frequencyUnit ? "request_received" : "request_completed"
    }
  })
    .then(res => {
      dispatch(createFundingSuccess(res));
    })
    .catch(err => dispatch(createFundingFail(err)))
}

export const createPortifolioAssetSizeSuccess = (res) => {
  return {
    type: actionTypes.CREATE_PORTIFOLIO_ASSET_SIZE_SUCCESS,
    portfolioAssetSize: res.data
  }
}

export const createPortifolioAssetSizeFail = (error) => {
  return {
    type: actionTypes.CREATE_PORTIFOLIO_ASSET_SIZE_FAIL,
    error: error
  }
}

export const createPortifolioAssetSizeStart = () => {
  return {
    type: actionTypes.CREATE_PORTIFOLIO_ASSET_SIZE_START
  }
}

export const createPortifolioAssetSize = payload => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  const { assetSize, cashFlow, portfolioId, date } = payload
  dispatch(createPortifolioAssetSizeStart())
  axios({
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}portfolio_asset_size`,
    data: {
      asset_size: assetSize,
      cash_flow: cashFlow,
      date: date,
      portfolio_id: portfolioId
    }
  })
    .then(res => {
      dispatch(createPortifolioAssetSizeSuccess(res));
    })
    .catch(err => dispatch(createPortifolioAssetSizeFail(err)))
}

export const getTransactionCodesSuccess = (res) => {
  return {
    type: actionTypes.GET_TRANSACTIONS_SUCCESS,
    transactionCodes: res.data.content
  }
}

export const getTransactionCodesFail = (error) => {
  return {
    type: actionTypes.GET_TRANSACTIONS_FAIL,
    error: error
  }
}

export const getTransactionCodesStart = () => {
  return {
    type: actionTypes.GET_TRANSACTIONS_START
  }
}

export const getTransactionCodes = payload => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  dispatch(getTransactionCodesStart())
  axios({
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}transaction_code`,
  })
    .then(res => {
      dispatch(getTransactionCodesSuccess(res));
    })
    .catch(err => dispatch(getTransactionCodesFail(err)))
}

export const createPortifolioTransactionSuccess = (res) => {
  return {
    type: actionTypes.CREATE_TRANSACTION_SUCCESS,
  }
}

export const createPortifolioTransactionFail = (error) => {
  return {
    type: actionTypes.CREATE_TRANSACTION_FAIL,
    error: error
  }
}

export const createPortifolioTransactionStart = () => {
  return {
    type: actionTypes.CREATE_TRANSACTION_START
  }
}

export const createPortifolioTransaction = payload => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  const { quantity, price, portfolioId, securityId, transactionCode, accountId, modelId } = payload
  dispatch(createPortifolioTransactionStart())
  axios({
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}portfolio_transaction`,
    data: {
      date: "2019-01-01",
      price: price,
      quantity: quantity,
      security_id: securityId,
      transaction_code_id: transactionCode,
      portfolio_id: portfolioId,
      account_id: accountId,
      model_id: modelId
    }
  })
    .then(res => {
      dispatch(createPortifolioTransactionSuccess(res));
    })
    .catch(err => dispatch(createPortifolioTransactionFail(err)))
}