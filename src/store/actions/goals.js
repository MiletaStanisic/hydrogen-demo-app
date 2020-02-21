import * as actionTypes from './actionTypes'
import axios from 'axios';
import { BASE_PATH, PROTON_PATH } from '../../configuration';

export const getGoalsSuccess = (res) => {
  return {
    type: actionTypes.GET_GOALS_SUCCESS,
    goals: res.data.content
  }
}

export const getGoalsFail = (error) => {
  return {
    type: actionTypes.GET_GOALS_FAIL,
    error: error
  }
}

export const getGoalsStart = () => {
  return {
    type: actionTypes.GET_GOALS_START
  }
}

export const getGoals = payload => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  dispatch(getGoalsStart())
  axios({
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}goal`
  })
    .then(res => {
      dispatch(getGoalsSuccess(res));
    })
    .catch(err => dispatch(getGoalsFail(err)))
}

export const getGoalProjectonsSuccess = (res) => {
  return {
    type: actionTypes.GET_GOAL_PROJECTION_SUCCESS,
    goalProjection: res.data
  }
}

export const getGoalProjectonsFail = (error) => {
  return {
    type: actionTypes.GET_GOAL_PROJECTION_FAIL,
    error: error
  }
}

export const getGoalProjectonsStart = () => {
  return {
    type: actionTypes.GET_GOAL_PROJECTION_START
  }
}

export const getGoalProjectons = payload => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  const { pRet, pRisk, horizon, depositAmount, goalAmount, currentInventory, goalType } = payload;
  dispatch(getGoalProjectonsStart())
  axios({
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${PROTON_PATH}${goalType}/status`,
    data: goalType === 'goal_decumulation' ? {
      p_ret: pRet,
      p_risk: pRisk,
      trading_days_per_year: 252,
      a_horizon: horizon - 1,
      d_horizon: 1,
      horizon_frequency: "year",
      deposit_config: [
        {
          dep_amount: depositAmount,
          dep_frequency: "month",
          dep_inflation: 0.0
        }
      ],
      withdrawal_config: [
        {
          with_amount: goalAmount + 12 * depositAmount,
        }
      ],
      goal_config: {
        goal_amount: goalAmount,
        goal_inflation: 0.0
      },
      curr_inv: currentInventory
    } : {
        p_ret: pRet,
        p_risk: pRisk,
        trading_days_per_year: 252,
        horizon: horizon,
        horizon_frequency: "year",
        deposit_config: [
          {

            dep_amount: depositAmount,
            dep_frequency: "month",
            dep_inflation: 0.0
          }
        ],
        goal_config: {
          goal_amount: goalAmount,
          goal_inflation: 0.0
        },
        curr_inv: currentInventory
      }
  })
    .then(res => {
      dispatch(getGoalProjectonsSuccess(res));
    })
    .catch(err => dispatch(getGoalProjectonsFail(err)))
}

export const getGoalSuccess = (res) => {
  return {
    type: actionTypes.GET_GOAL_SUCCESS,
    goal: res.data
  }
}

export const getGoalFail = (error) => {
  return {
    type: actionTypes.GET_GOAL_FAIL,
    error: error
  }
}

export const getGoalStart = () => {
  return {
    type: actionTypes.GET_GOAL_START
  }
}

export const getGoal = payload => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  dispatch(getGoalStart())
  axios({
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}goal/${payload}`
  })
    .then(res => {
      dispatch(getGoalSuccess(res));
    })
    .catch(err => dispatch(getGoalFail(err)))
}

export const updateGoalSuccess = (res) => {
  return {
    type: actionTypes.UPDATE_GOAL_SUCCESS,
    goal: res.data
  }
}

export const updateGoalFail = (error) => {
  return {
    type: actionTypes.UPDATE_GOAL_FAIL,
    error: error
  }
}

export const updateGoalStart = () => {
  return {
    type: actionTypes.UPDATE_GOAL_START
  }
}

export const updateGoal = payload => (dispatch, getState) => {
  const { accessToken, name, type, category, goal_amount, is_decumulation } = getState().user;
  const { id } = payload;
  dispatch(updateGoalStart())
  axios({
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}goal/${id}`,
    data: {
      name,
      type,
      category,
      goal_amount,
      is_decumulation
    }
  })
    .then(res => {
      dispatch(updateGoalSuccess(res));
    })
    .catch(err => dispatch(updateGoalFail(err)))
}