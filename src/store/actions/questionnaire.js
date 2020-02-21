import * as actionTypes from './actionTypes'
import axios from 'axios';
import { BASE_PATH } from '../../configuration';

export const getQuestionnairesSuccess = (res) => {
  return {
    type: actionTypes.GET_QUESTIONNAIRES_SUCCESS,
    questionnaires: res.data.content
  }
}

export const getQuestionnairesFail = (error) => {
  return {
    type: actionTypes.GET_QUESTIONNAIRES_FAIL,
    error: error
  }
}

export const getQuestionnairesStart = () => {
  return {
    type: actionTypes.GET_QUESTIONNAIRES_START
  }
}

export const getQuestionnaires = payload => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  dispatch(getQuestionnairesStart())
  axios({
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}questionnaire`,
  })
    .then(res => {
      dispatch(getQuestionnairesSuccess(res));
    })
    .catch(err => dispatch(getQuestionnairesFail(err)))
}

export const getNodesSuccess = (res) => {
  return {
    type: actionTypes.GET_NODES_SUCCESS,
    nodes: res.data.content
  }
}

export const getNodesFail = (error) => {
  return {
    type: actionTypes.GET_NODES_FAIL,
    error: error
  }
}

export const getNodesStart = () => {
  return {
    type: actionTypes.GET_NODES_START
  }
}

export const getNodes = payload => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  dispatch(getNodesStart())
  axios({
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}node`,
  })
    .then(res => {
      dispatch(getNodesSuccess(res));
    })
    .catch(err => dispatch(getNodesFail(err)))
}

export const getNodeRelationshipsSuccess = (res) => {
  return {
    type: actionTypes.GET_NODE_RELATIONSHIPS_SUCCESS,
    nodeRelationships: res.data.content
  }
}

export const getNodeRelationshipsFail = (error) => {
  return {
    type: actionTypes.GET_NODE_RELATIONSHIPS_FAIL,
    error: error
  }
}

export const getNodeRelationshipsStart = () => {
  return {
    type: actionTypes.GET_NODE_RELATIONSHIPS_START
  }
}

export const getNodeRelationships = payload => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  dispatch(getNodeRelationshipsStart())
  axios({
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}node_relationship`,
  })
    .then(res => {
      dispatch(getNodeRelationshipsSuccess(res));
    })
    .catch(err => dispatch(getNodeRelationshipsFail(err)))
}

export const getAllocationsSuccess = (res) => {
  return {
    type: actionTypes.GET_ALLOCATIONS_SUCCESS,
    allocations: res.data.content
  }
}

export const getAllocationsFail = (error) => {
  return {
    type: actionTypes.GET_ALLOCATIONS_FAIL,
    error: error
  }
}

export const getAllocationsStart = () => {
  return {
    type: actionTypes.GET_ALLOCATIONS_START
  }
}

export const getAllocations = payload => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  dispatch(getAllocationsStart())
  axios({
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}allocation`,
  })
    .then(res => {
      dispatch(getAllocationsSuccess(res));
    })
    .catch(err => dispatch(getAllocationsFail(err)))
}