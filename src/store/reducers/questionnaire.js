import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
  questionnaires: [],
  nodes: [],
  nodeRelationships: [],
  allocations: [],
  goal: {}
}

const getQuestionnairesStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const getQuestionnairesSuccess = (state, action) => {
  return updateObject(state, {
    questionnaires: action.questionnaires,
    loading: false
  })
}

const getQuestionnairesFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const getNodesStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const getNodesSuccess = (state, action) => {
  return updateObject(state, {
    nodes: action.nodes,
    loading: false
  })
}

const getNodesFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const getNodeRelationshipsStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const getNodeRelationshipsSuccess = (state, action) => {
  return updateObject(state, {
    nodeRelationships: action.nodeRelationships,
    loading: false
  })
}

const getNodeRelationshipsFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const getAllocationsStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const getAllocationsSuccess = (state, action) => {
  return updateObject(state, {
    allocations: action.allocations,
    loading: false
  })
}

const getAllocationsFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALLOCATIONS_START: return getAllocationsStart(state, action)
    case actionTypes.GET_ALLOCATIONS_SUCCESS: return getAllocationsSuccess(state, action)
    case actionTypes.GET_ALLOCATIONS_FAIL: return getAllocationsFail(state, action)
    case actionTypes.GET_NODE_RELATIONSHIPS_START: return getNodeRelationshipsStart(state, action)
    case actionTypes.GET_NODE_RELATIONSHIPS_SUCCESS: return getNodeRelationshipsSuccess(state, action)
    case actionTypes.GET_NODE_RELATIONSHIPS_FAIL: return getNodeRelationshipsFail(state, action)
    case actionTypes.GET_NODES_START: return getNodesStart(state, action)
    case actionTypes.GET_NODES_SUCCESS: return getNodesSuccess(state, action)
    case actionTypes.GET_NODES_FAIL: return getNodesFail(state, action)
    case actionTypes.GET_QUESTIONNAIRES_START: return getQuestionnairesStart(state, action)
    case actionTypes.GET_QUESTIONNAIRES_SUCCESS: return getQuestionnairesSuccess(state, action)
    case actionTypes.GET_QUESTIONNAIRES_FAIL: return getQuestionnairesFail(state, action)
    default: return state
  }
}

export default reducer