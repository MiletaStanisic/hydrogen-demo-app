import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
  funding: [],
  transactionCodes: [],
  loading: false,
  portfolioAssetSize: {}
}

const getFundingStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const getFundingSuccess = (state, action) => {
  return updateObject(state, {
    funding: action.funding,
    loading: false
  })
}

const getFundingFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const createFundingStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const createFundingSuccess = (state, action) => {
  return updateObject(state, {
    funding: [action.funding],
    loading: false
  })
}

const createFundingFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const createPortifolioAssetSizeStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const createPortifolioAssetSizeSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    portfolioAssetSize: action.portfolioAssetSize
  })
}

const createPortifolioAssetSizeFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const getTransactionCodesStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const getTransactionCodesSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    transactionCodes: action.transactionCodes
  })
}

const getTransactionCodesFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const createPortifolioTransactionStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const createPortifolioTransactionSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    transactionCodes: action.transactionCodes
  })
}

const createPortifolioTransactionFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_TRANSACTION_START: return createPortifolioTransactionStart(state, action)
    case actionTypes.CREATE_TRANSACTION_SUCCESS: return createPortifolioTransactionSuccess(state, action)
    case actionTypes.CREATE_TRANSACTION_FAIL: return createPortifolioTransactionFail(state, action)
    case actionTypes.GET_TRANSACTIONS_START: return getTransactionCodesStart(state, action)
    case actionTypes.GET_TRANSACTIONS_SUCCESS: return getTransactionCodesSuccess(state, action)
    case actionTypes.GET_TRANSACTIONS_FAIL: return getTransactionCodesFail(state, action)
    case actionTypes.CREATE_PORTIFOLIO_ASSET_SIZE_START: return createPortifolioAssetSizeStart(state, action)
    case actionTypes.CREATE_PORTIFOLIO_ASSET_SIZE_SUCCESS: return createPortifolioAssetSizeSuccess(state, action)
    case actionTypes.CREATE_PORTIFOLIO_ASSET_SIZE_FAIL: return createPortifolioAssetSizeFail(state, action)
    case actionTypes.CREATE_FUNDING_START: return createFundingStart(state, action)
    case actionTypes.CREATE_FUNDING_SUCCESS: return createFundingSuccess(state, action)
    case actionTypes.CREATE_FUNDING_FAIL: return createFundingFail(state, action)
    case actionTypes.GET_FUNDING_START: return getFundingStart(state, action)
    case actionTypes.GET_FUNDING_SUCCESS: return getFundingSuccess(state, action)
    case actionTypes.GET_FUNDING_FAIL: return getFundingFail(state, action)
    default: return state
  }
}

export default reducer