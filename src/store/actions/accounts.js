import * as actionTypes from './actionTypes'
import axios from 'axios';
import { createFunding, getTransactionCodes, getModelHoldings } from './index';
import { BASE_PATH } from '../../configuration';

export const setAccount = (payload) => {
  return {
    type: actionTypes.SET_ACCOUNT,
    account: payload,
  }
}

export const setDate = (payload) => {
  return {
    type: actionTypes.SET_DATE,
    date: payload,
  }
}

export const getAccountTypesSuccess = (res) => {
  return {
    type: actionTypes.GET_ACCOUNT_TYPES_SUCCESS,
    accountTypes: res.data.content
  }
}

export const getAccountTypesFail = (error) => {
  return {
    type: actionTypes.GET_ACCOUNT_TYPES_FAIL,
    error: error
  }
}

export const getAccountTypesStart = () => {
  return {
    type: actionTypes.GET_ACCOUNT_TYPES_START
  }
}

export const getAccountTypes = payload => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  dispatch(getAccountTypesStart())
  axios({
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}account_type`,
  })
    .then(res => {
      dispatch(getAccountTypesSuccess(res));
    })
    .catch(err => dispatch(getAccountTypesFail(err)))
}

export const getAccountsSuccess = (res) => {
  return {
    type: actionTypes.GET_ACCOUNTS_SUCCESS,
    accounts: res.data.content
  }
}

export const getAccountsFail = (error) => {
  return {
    type: actionTypes.GET_ACCOUNTS_FAIL,
    error: error
  }
}

export const getAccountsStart = () => {
  return {
    type: actionTypes.GET_ACCOUNTS_START
  }
}

export const getAccounts = payload => async (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  dispatch(getAccountsStart())
  await axios({
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}account`,
  })
    .then(res => {
      dispatch(getAccountsSuccess(res));
    })
    .catch(err => dispatch(getAccountsFail(err)))
}

export const createAccountSuccess = (res) => {
  return {
    type: actionTypes.CREATE_ACCOUNT_SUCCESS,
    account: res.data
  }
}

export const createAccountFail = (error) => {
  return {
    type: actionTypes.CREATE_ACCOUNT_FAIL,
    error: error
  }
}

export const createAccountStart = () => {
  return {
    type: actionTypes.CREATE_ACCOUNT_START
  }
}

export const createAccountt = payload => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  const { accountTypeId, clientId, isDecomulation, goalId, goalAmount, decumulationHorizon, accumulationHorizon, accountNumber, accountName } = payload;
  dispatch(createAccountStart())
  axios({
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}account`,
    data: {
      name: accountName,
      account_type_id: accountTypeId,
      account_number: accountNumber,
      clients: [{
        client_id: clientId,
        client_account_association_type: 'owner'
      }],
      goals: isDecomulation ? [{
        goal_id: goalId,
        goal_amount: goalAmount,
        decumulation_horizon: decumulationHorizon
      }] : [{
        goal_id: goalId,
        goal_amount: goalAmount,
        accumulation_horizon: accumulationHorizon
      }]
    }
  })
    .then(res => {
      dispatch(createAccountSuccess(res));
      payload.accountId = res.data.id
      dispatch(subscribeAccountt(payload));
    })
    .catch(err => dispatch(createAccountFail(err)))
}

export const subscribeAccountClear = (payload) => {
  return {
    type: actionTypes.SUBSCRIBE_ACCOUNT_CLEAR,
    accountSubscription: {}
  }
}

export const accountPortfolioHoldingClear = (payload) => {
  return {
    type: actionTypes.ACCOUNT_PORTFOLIO_HOLDING_CLEAR,
    accountPortifolioHoldings: []
  }
}

export const accountsClear = (payload) => {
  return {
    type: actionTypes.ACCOUNTS_CLEAR,
    accounts: []
  }
}

export const subscribeAccountSuccess = (res) => {
  return {
    type: actionTypes.SUBSCRIBE_ACCOUNT_SUCCESS,
    accountSubscription: res.data[0]
  }
}

export const subscribeAccountFail = (error) => {
  return {
    type: actionTypes.SUBSCRIBE_ACCOUNT_FAIL,
    error: error
  }
}

export const subscribeAccountStart = () => {
  return {
    type: actionTypes.SUBSCRIBE_ACCOUNT_START
  }
}

export const subscribeAccountt = payload => (dispatch, getState) => {
  const { accessToken } = getState().user;
  const { allocationId, goalId, accountId, monthlyDeposit } = payload;
  dispatch(subscribeAccountStart())
  axios({
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}account/${accountId}/subscribe`,
    data: {
      current_weight: 100,
      strategic_weight: 100,
      allocation_id: allocationId,
      goal_id: goalId,
      date: "2019-01-01"
    }
  })
    .then(res => {
      dispatch(subscribeAccountSuccess(res));
      dispatch(createFunding({ frequencyUnit: 'monthly', accountId: accountId, amount: monthlyDeposit }));
      dispatch(getAccountPortifolio({ accountId: accountId }));
      dispatch(getTransactionCodes());
      dispatch(getModelHoldings(res.data[0].model_id));
    })
    .catch(err => dispatch(subscribeAccountFail(err)))
}

export const getAccountAllocationSuccess = (res) => {
  return {
    type: actionTypes.GET_ACCOUNT_ALLOCATION_SUCCESS,
    accountAllocation: res.data.content[0]
  }
}

export const getAccountAllocationFail = (error) => {
  return {
    type: actionTypes.GET_ACCOUNT_ALLOCATION_FAIL,
    error: error
  }
}

export const getAccountAllocationStart = () => {
  return {
    type: actionTypes.GET_ACCOUNT_ALLOCATION_START
  }
}

export const getAccountAllocation = payload => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  dispatch(getAccountAllocationStart())
  axios({
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}account_allocation`,
    params: {
      "filter": `account_id==${payload}`
    }
  })
    .then(res => {
      dispatch(getAccountAllocationSuccess(res));
    })
    .catch(err => {
      dispatch(getAccountAllocationFail(err))
    })
}

export const getAccountPortifolioSuccess = (res) => {
  return {
    type: actionTypes.GET_ACCOUNT_PORTIFOLIO_SUCCESS,
    accountPortifolio: res.data.content[0]
  }
}

export const getAccountPortifolioFail = (error) => {
  return {
    type: actionTypes.GET_ACCOUNT_PORTIFOLIO_FAIL,
    error: error
  }
}


export const getAccountPortifolioStart = () => {
  return {
    type: actionTypes.GET_ACCOUNT_PORTIFOLIO_START
  }
}

export const getAccountPortifolio = payload => (dispatch, getState) => {
  const { accessToken } = getState().user;
  const { accountId } = payload;
  dispatch(getAccountPortifolioStart())
  axios({
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}portfolio`,
    params: {
      "filter": `account_id==${accountId}`
    }
  })
    .then(res => {
      dispatch(getAccountPortifolioSuccess(res));
    })
    .catch(err => dispatch(getAccountPortifolioFail(err)))
}

export const getAccountFundingSuccess = (res) => {
  return {
    type: actionTypes.GET_ACCOUNT_FUNDING_SUCCESS,
    fundings: res.data.content
  }
}

export const getAccountFundingFail = (error) => {
  return {
    type: actionTypes.GET_ACCOUNT_FUNDING_FAIL,
    error: error
  }
}

export const getAccountFundingStart = () => {
  return {
    type: actionTypes.GET_ACCOUNT_FUNDING_START
  }
}

export const getAccountFunding = payload => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  dispatch(getAccountFundingStart())
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
      dispatch(getAccountFundingSuccess(res));
    })
    .catch(err => dispatch(getAccountFundingFail(err)))
}

export const getAccountAssetSizeSuccess = (res) => {
  return {
    type: actionTypes.GET_ACCOUNT_ASSET_SIZE_SUCCESS,
    accountAssetSize: res.data
  }
}

export const getAccountAssetSizeFail = (error) => {
  return {
    type: actionTypes.GET_ACCOUNT_ASSET_SIZE_FAIL,
    error: error
  }
}

export const getAccountAssetSizeStart = () => {
  return {
    type: actionTypes.GET_ACCOUNT_ASSET_SIZE_START
  }
}

export const getAccountAssetSize = payload => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  dispatch(getAccountAssetSizeStart())
  axios({
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}account/${payload}/asset_size`
  })
    .then(res => {
      dispatch(getAccountAssetSizeSuccess(res));
    })
    .catch(err => dispatch(getAccountAssetSizeFail(err)))
}

export const getAccountPortifolioHoldingsSuccess = (res) => {
  return {
    type: actionTypes.GET_ACCOUNT_PORTIFOLIO_HOLDING_SUCCESS,
    accountPortifolioHoldings: res.data.content
  }
}

export const getAccountPortifolioHoldingsFail = (error) => {
  return {
    type: actionTypes.GET_ACCOUNT_PORTIFOLIO_HOLDING_FAIL,
    error: error
  }
}

export const getAccountPortifolioHoldingsStart = () => {
  return {
    type: actionTypes.GET_ACCOUNT_PORTIFOLIO_HOLDING_START
  }
}

export const getAccountPortifolioHoldings = payload => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  dispatch(getAccountPortifolioHoldingsStart())
  axios({
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}portfolio_holding?order_by=date`,
    params: {
      "filter": `account_id==${payload}`
    }
  })
    .then(res => {
      dispatch(getAccountPortifolioHoldingsSuccess(res));
    })
    .catch(err => dispatch(getAccountPortifolioHoldingsFail(err)))
}

export const createPortfolioHoldingSuccess = (res) => {
  return {
    type: actionTypes.CREATE_PORFOLIO_HOLDING_SUCCESS,
    porfolioHolding: res.data
  }
}

export const createPortfolioHoldingFail = (error) => {
  return {
    type: actionTypes.CREATE_PORFOLIO_HOLDING_FAIL,
    error: error
  }
}



export const createPortfolioHoldingStart = () => {
  return {
    type: actionTypes.CREATE_PORFOLIO_HOLDING_START
  }
}

export const createPortfolioHoldingg = payload => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  const { amount, shares, date, weight, security_id, portfolio_id } = payload;
  dispatch(createPortfolioHoldingStart())
  axios({
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}portfolio_holding`,
    data: {
      amount: amount,
      shares: shares,
      date: date,
      weight: weight,
      security_id: security_id,
      portfolio_id: portfolio_id
    }
  })
    .then(res => {
      dispatch(createPortfolioHoldingSuccess(res));
    })
    .catch(err => dispatch(createPortfolioHoldingFail(err)))
}