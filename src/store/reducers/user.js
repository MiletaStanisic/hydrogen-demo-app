import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
  userAccessToken: '',
  loading: false,
  accessToken: localStorage.getItem('accessToken'),
  username: '',
  user: {},
  clientAssetSize: [],
  clientAnnualVolume: {},
  clientCumulativeReturn: {},
  clientHoldings: []
}
const setAccessToken = (state, action) => {
  // return updateObject(state, { accessToken: action.accessToken })
}

const setClientAssetSize = (state, action) => {
  return updateObject(state, { clientAssetSize: action.clientAssetSize })
}

const authenticateUserStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const authenticateUserSuccess = (state, action) => {
  return updateObject(state, {
    userAccessToken: action.accessToken,
    username: action.username,
    loading: false
  })
}

const authenticateUserFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const getUserStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const getUserSuccess = (state, action) => {
  return updateObject(state, {
    user: action.user,
    loading: false
  })
}

const getUserFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const getClientsStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const getClientsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false
  })
}

const getClientsFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const getClientAssetSizeStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const getClientAssetSizeSuccess = (state, action) => {
  return updateObject(state, {
    clientAssetSize: action.clientAssetSize,
    loading: false
  })
}

const getClientAssetSizeFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const getClientAnnualVolumeStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const getClientAnnualVolumeSuccess = (state, action) => {
  return updateObject(state, {
    clientAnnualVolume: action.clientAnnualVolume,
    loading: false
  })
}

const getClientAnnualVolumeFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const getClientCumulativeReturnStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const getClientCumulativeReturnSuccess = (state, action) => {
  return updateObject(state, {
    clientCumulativeReturn: action.clientCumulativeReturn,
    loading: false
  })
}

const getClientCumulativeReturnFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const getClientHoldingsStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const getClientHoldingsSuccess = (state, action) => {
  return updateObject(state, {
    clientHoldings: action.clientHoldings,
    loading: false
  })
}

const getClientHoldingsFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const logoutUser = (state, action) => {
  return updateObject(state, {
    user: action.user
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CLIENT_HOLDING_START: return getClientHoldingsStart(state, action)
    case actionTypes.GET_CLIENT_HOLDING_SUCCESS: return getClientHoldingsSuccess(state, action)
    case actionTypes.GET_CLIENT_HOLDING_FAIL: return getClientHoldingsFail(state, action)
    case actionTypes.GET_CLIENT_CUM_RETURN_START: return getClientCumulativeReturnStart(state, action)
    case actionTypes.GET_CLIENT_CUM_RETURN_SUCCESS: return getClientCumulativeReturnSuccess(state, action)
    case actionTypes.GET_CLIENT_CUM_RETURN_FAIL: return getClientCumulativeReturnFail(state, action)
    case actionTypes.GET_CLIENT_ANN_VOLUME_START: return getClientAnnualVolumeStart(state, action)
    case actionTypes.GET_CLIENT_ANN_VOLUME_SUCCESS: return getClientAnnualVolumeSuccess(state, action)
    case actionTypes.GET_CLIENT_ANN_VOLUME_FAIL: return getClientAnnualVolumeFail(state, action)
    case actionTypes.GET_CLIENT_ASSET_SIZE_START: return getClientAssetSizeStart(state, action)
    case actionTypes.GET_CLIENT_ASSET_SIZE_SUCCESS: return getClientAssetSizeSuccess(state, action)
    case actionTypes.GET_CLIENT_ASSET_SIZE_FAIL: return getClientAssetSizeFail(state, action)
    case actionTypes.AUTHENTICATE_USER_START: return authenticateUserStart(state, action)
    case actionTypes.AUTHENTICATE_USER_SUCCESS: return authenticateUserSuccess(state, action)
    case actionTypes.AUTHENTICATE_USER_FAIL: return authenticateUserFail(state, action)
    case actionTypes.GET_USER_START: return getUserStart(state, action)
    case actionTypes.GET_USER_SUCCESS: return getUserSuccess(state, action)
    case actionTypes.GET_USER_FAIL: return getUserFail(state, action)
    case actionTypes.SET_ACCESS_TOKEN: return setAccessToken(state, action)
    case actionTypes.SET_CLIENT_ASSET_SIZE: return setClientAssetSize(state, action)
    case actionTypes.GET_CLIENTS_START: return getClientsStart(state, action)
    case actionTypes.GET_CLIENTS_SUCCESS: return getClientsSuccess(state, action)
    case actionTypes.GET_CLIENTS_FAIL: return getClientsFail(state, action)
    case actionTypes.REMOVE_USER: return logoutUser(state, action)
    default: return state
  }
}

export default reducer