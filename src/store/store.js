import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import updateStateReducer from './reducers/updateState'
import userReducer from './reducers/user'
import goalsReducer from './reducers/goals'
import initializeReducer from './reducers/initialize'
import questionnaireReducer from './reducers/questionnaire'
import accountsReducer from './reducers/accounts'
import modelReducer from './reducers/models'
import allocationReducer from './reducers/allocations'
import fundingReducer from './reducers/funding'


const rootReducer = combineReducers({
  updateState: updateStateReducer,
  user: userReducer,
  goals: goalsReducer,
  initialize: initializeReducer,
  questionnaire: questionnaireReducer,
  accounts: accountsReducer,
  allocations: allocationReducer,
  models: modelReducer,
  funding: fundingReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
