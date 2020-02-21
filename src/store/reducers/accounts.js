import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
  accounts: [],
  accountTypes: [],
  account: {},
  accountAllocation: {},
  accountPortifolio: {},
  accountAssetSize: [],
  fundings: [],
  accountPortifolioHoldings: [],
  model: {},
  modelHoldings: [],
  accountSubscription: {},
  porfolioHolding: [],
  date: ''
}

const setAccount = (state, action) => {
  return updateObject(state, { account: action.account })
}

const setDate = (state, action) => {
  return updateObject(state, { date: action.date })
}

const getAccountsStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const getAccountsSuccess = (state, action) => {
  return updateObject(state, {
    accounts: action.accounts,
    loading: false
  })
}

const getAccountsFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const getAccountTypesStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const getAccountTypesSuccess = (state, action) => {
  return updateObject(state, {
    accountTypes: action.accountTypes,
    loading: false
  })
}

const getAccountTypesFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const createAccountStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const createAccountSuccess = (state, action) => {
  return updateObject(state, {
    account: action.account,
    loading: false
  })
}

const createAccountFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const subscribeAccountStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const subscribeAccountSuccess = (state, action) => {
  return updateObject(state, {
    accountSubscription: action.accountSubscription,
    loading: false
  })
}

const subscribeAccountFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const getAccountAllocationStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const getAccountAllocationSuccess = (state, action) => {
  return updateObject(state, {
    accountAllocation: action.accountAllocation,
    loading: false
  })
}

const getAccountAllocationFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const getAccountPortifolioStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const getAccountPortifolioSuccess = (state, action) => {
  return updateObject(state, {
    accountPortifolio: action.accountPortifolio,
    loading: false
  })
}

const getAccountPortifolioFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const getAccountFundingStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const getAccountFundingSuccess = (state, action) => {
  return updateObject(state, {
    fundings: action.fundings,
    loading: false
  })
}

const getAccountFundingFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const getAccountAssetSizeStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const getAccountAssetSizeSuccess = (state, action) => {
  return updateObject(state, {
    accountAssetSize: action.accountAssetSize,
    loading: false
  })
}

const getAccountAssetSizeFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const getAccountPortifolioHoldingsStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const getAccountPortifolioHoldingsSuccess = (state, action) => {
  return updateObject(state, {
    accountPortifolioHoldings: action.accountPortifolioHoldings,
    loading: false
  })
}

const getAccountPortifolioHoldingsFail = (state, action) => {
  return updateObject(state, { loading: false })
}


const createPortfolioHoldingStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const createPortfolioHoldingSuccess = (state, action) => {
  return updateObject(state, {
    porfolioHolding: action.porfolioHolding,
    loading: false
  })
}

const createPortfolioHoldingFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const subscribeAccountClear = (state, action) => {
  return updateObject(state, {
    accountSubscription: action.accountSubscription,
    loading: false
  })
}

const accountPortfolioHoldingClear = (state, action) => {
  return updateObject(state, {
    accountPortifolioHoldings: action.accountPortifolioHoldings,
    loading: false
  })
}

const accountsClear = (state, action) => {
  return updateObject(state, {
    accounts: action.accounts,
    loading: false
  })
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ACCOUNT_PORTIFOLIO_HOLDING_START: return getAccountPortifolioHoldingsStart(state, action)
    case actionTypes.GET_ACCOUNT_PORTIFOLIO_HOLDING_SUCCESS: return getAccountPortifolioHoldingsSuccess(state, action)
    case actionTypes.GET_ACCOUNT_PORTIFOLIO_HOLDING_FAIL: return getAccountPortifolioHoldingsFail(state, action)
    case actionTypes.GET_ACCOUNT_ASSET_SIZE_START: return getAccountAssetSizeStart(state, action)
    case actionTypes.GET_ACCOUNT_ASSET_SIZE_SUCCESS: return getAccountAssetSizeSuccess(state, action)
    case actionTypes.GET_ACCOUNT_ASSET_SIZE_FAIL: return getAccountAssetSizeFail(state, action)
    case actionTypes.GET_ACCOUNT_FUNDING_START: return getAccountFundingStart(state, action)
    case actionTypes.GET_ACCOUNT_FUNDING_SUCCESS: return getAccountFundingSuccess(state, action)
    case actionTypes.GET_ACCOUNT_FUNDING_FAIL: return getAccountFundingFail(state, action)
    case actionTypes.GET_ACCOUNT_PORTIFOLIO_START: return getAccountPortifolioStart(state, action)
    case actionTypes.GET_ACCOUNT_PORTIFOLIO_SUCCESS: return getAccountPortifolioSuccess(state, action)
    case actionTypes.GET_ACCOUNT_PORTIFOLIO_FAIL: return getAccountPortifolioFail(state, action)
    case actionTypes.GET_ACCOUNT_ALLOCATION_START: return getAccountAllocationStart(state, action)
    case actionTypes.GET_ACCOUNT_ALLOCATION_SUCCESS: return getAccountAllocationSuccess(state, action)
    case actionTypes.GET_ACCOUNT_ALLOCATION_FAIL: return getAccountAllocationFail(state, action)
    case actionTypes.SUBSCRIBE_ACCOUNT_START: return subscribeAccountStart(state, action)
    case actionTypes.SUBSCRIBE_ACCOUNT_SUCCESS: return subscribeAccountSuccess(state, action)
    case actionTypes.SUBSCRIBE_ACCOUNT_FAIL: return subscribeAccountFail(state, action)
    case actionTypes.CREATE_ACCOUNT_START: return createAccountStart(state, action)
    case actionTypes.CREATE_ACCOUNT_SUCCESS: return createAccountSuccess(state, action)
    case actionTypes.CREATE_ACCOUNT_FAIL: return createAccountFail(state, action)
    case actionTypes.GET_ACCOUNTS_START: return getAccountsStart(state, action)
    case actionTypes.GET_ACCOUNTS_SUCCESS: return getAccountsSuccess(state, action)
    case actionTypes.GET_ACCOUNTS_FAIL: return getAccountsFail(state, action)
    case actionTypes.GET_ACCOUNT_TYPES_START: return getAccountTypesStart(state, action)
    case actionTypes.GET_ACCOUNT_TYPES_SUCCESS: return getAccountTypesSuccess(state, action)
    case actionTypes.GET_ACCOUNT_TYPES_FAIL: return getAccountTypesFail(state, action)
    case actionTypes.SET_ACCOUNT: return setAccount(state, action)
    case actionTypes.SET_DATE: return setDate(state, action)
    case actionTypes.CREATE_PORFOLIO_HOLDING_START: return createPortfolioHoldingStart(state, action)
    case actionTypes.CREATE_PORFOLIO_HOLDING_SUCCESS: return createPortfolioHoldingSuccess(state, action)
    case actionTypes.CREATE_PORFOLIO_HOLDING_FAIL: return createPortfolioHoldingFail(state, action)
    case actionTypes.SUBSCRIBE_ACCOUNT_CLEAR: return subscribeAccountClear(state, action)
    case actionTypes.ACCOUNT_PORTFOLIO_HOLDING_CLEAR: return accountPortfolioHoldingClear(state, action)
    case actionTypes.ACCOUNTS_CLEAR: return accountsClear(state, action)
    default: return state
  }
}

export default reducer