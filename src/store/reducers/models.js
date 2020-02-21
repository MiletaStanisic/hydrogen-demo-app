import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
  model: {},
  modelHoldings: [],
  securities: [],
}

const retrieveModelStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const retrieveModelSuccess = (state, action) => {
  return updateObject(state, {
    model: action.model,
    loading: false
  })
}

const retrieveModelFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const getModelHoldingsStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const getModelHoldingsSuccess = (state, action) => {
  return updateObject(state, {
    modelHoldings: action.modelHoldings,
    loading: false
  })
}

const getModelHoldingsFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const getAllSecuritiesFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const getAllSecuritiesStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const getAllSecuritiesSuccess = (state, action) => {
  return updateObject(state, {
    securities: action.securities
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_SECURITIES_START: return getAllSecuritiesStart(state, action)
    case actionTypes.GET_ALL_SECURITIES_SUCCESS: return getAllSecuritiesSuccess(state, action)
    case actionTypes.GET_ALL_SECURITIES_FAIL: return getAllSecuritiesFail(state, action)
    case actionTypes.RETRIEVE_MODEL_START: return retrieveModelStart(state, action)
    case actionTypes.RETRIEVE_MODEL_SUCCESS: return retrieveModelSuccess(state, action)
    case actionTypes.RETRIEVE_MODEL_FAIL: return retrieveModelFail(state, action)
    case actionTypes.GET_MODEL_HOLDINGS_START: return getModelHoldingsStart(state, action)
    case actionTypes.GET_MODEL_HOLDINGS_SUCCESS: return getModelHoldingsSuccess(state, action)
    case actionTypes.GET_MODEL_HOLDINGS_FAIL: return getModelHoldingsFail(state, action)
    default: return state
  }
}

export default reducer