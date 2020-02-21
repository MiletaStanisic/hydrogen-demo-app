import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
  goals: [],
  goal: {},
  goalProjection: {}
}

const getGoalsStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const getGoalsSuccess = (state, action) => {
  return updateObject(state, {
    goals: action.goals,
    loading: false
  })
}

const getGoalsFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const getGoalStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const getGoalSuccess = (state, action) => {
  return updateObject(state, {
    goal: action.goal,
    loading: false
  })
}

const getGoalFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const updateGoalStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const updateGoalSuccess = (state, action) => {
  return updateObject(state, {
    goal: action.goal,
    loading: false
  })
}

const updateGoalFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const getGoalProjectionStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const getGoalProjectionSuccess = (state, action) => {
  return updateObject(state, {
    goalProjection: action.goalProjection,
    loading: false
  })
}

const getGoalProjectionFail = (state, action) => {
  return updateObject(state, { loading: false })
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_GOAL_PROJECTION_START: return getGoalProjectionStart(state, action)
    case actionTypes.GET_GOAL_PROJECTION_SUCCESS: return getGoalProjectionSuccess(state, action)
    case actionTypes.GET_GOAL_PROJECTION_FAIL: return getGoalProjectionFail(state, action)
    case actionTypes.GET_GOALS_START: return getGoalsStart(state, action)
    case actionTypes.GET_GOALS_SUCCESS: return getGoalsSuccess(state, action)
    case actionTypes.GET_GOALS_FAIL: return getGoalsFail(state, action)
    case actionTypes.GET_GOAL_START: return getGoalStart(state, action)
    case actionTypes.GET_GOAL_SUCCESS: return getGoalSuccess(state, action)
    case actionTypes.GET_GOAL_FAIL: return getGoalFail(state, action)
    case actionTypes.UPDATE_GOAL_START: return updateGoalStart(state, action)
    case actionTypes.UPDATE_GOAL_SUCCESS: return updateGoalSuccess(state, action)
    case actionTypes.UPDATE_GOAL_FAIL: return updateGoalFail(state, action)
    default: return state
  }
}

export default reducer