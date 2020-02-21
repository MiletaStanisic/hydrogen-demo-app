import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
  allocation: {},
  allocationPerformance: {},
  allocationComposition: {}
}

const getAllocationStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const getAllocationSuccess = (state, action) => {
  return updateObject(state, {
    allocation: action.allocation,
    loading: false
  })
}

const getAllocationFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const getAllocationPerformanceStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const getAllocationPerformanceSuccess = (state, action) => {
  return updateObject(state, {
    allocationPerformance: action.allocationPerformance,
    loading: false
  })
}

const getAllocationPerformanceFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const getAllocationCompositionStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const getAllocationCompositionSuccess = (state, action) => {
  return updateObject(state, {
    allocationComposition: action.allocationComposition,
    loading: false
  })
}

const getAllocationCompositionFail = (state, action) => {
  return updateObject(state, { loading: false })
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALLOCATION_COMPOSITION_START: return getAllocationCompositionStart(state, action)
    case actionTypes.GET_ALLOCATION_COMPOSITION_SUCCESS: return getAllocationCompositionSuccess(state, action)
    case actionTypes.GET_ALLOCATION_COMPOSITION_FAIL: return getAllocationCompositionFail(state, action)
    case actionTypes.GET_ALLOCATION_START: return getAllocationStart(state, action)
    case actionTypes.GET_ALLOCATION_SUCCESS: return getAllocationSuccess(state, action)
    case actionTypes.GET_ALLOCATION_FAIL: return getAllocationFail(state, action)
    case actionTypes.GET_ALLOCATION_PERFORMANCE_START: return getAllocationPerformanceStart(state, action)
    case actionTypes.GET_ALLOCATION_PERFORMANCE_SUCCESS: return getAllocationPerformanceSuccess(state, action)
    case actionTypes.GET_ALLOCATION_PERFORMANCE_FAIL: return getAllocationPerformanceFail(state, action)
    default: return state
  }
}

export default reducer