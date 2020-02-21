import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
  accountTypes: {},
  accountType: [],
  securities: [],
  security: {},
  allocations: [],
  allocation: {},
  models: [],
  model: {},
  modelHoldings: [],
  modelHolding: {},
  goals: [],
  goal: {},
  clientAdminService: {},
  clientNucleusService: {},
  clientsAdminService: [],
  clientsNucleusService: [],
  accounts: [],
  account: {},
  subscriptions: [],
  subscription: {},
  porfolios: [],
  porfolio: {},
  porfolioHoldings: [],
  porfolioHolding: {},
  decisionTree: {},
  questionnaire: {},
  nodes: [],
  node: {},
  nodeRelationships: [],
  nodeRelationship: {},
  transactionCodes: [],
  portfolioTransactions: [],
  portfolioAssetSize: []
}

const createSecurity = (state, action) => {
  return updateObject(state, { securities: action.security });
}

const createAllocation = (state, action) => {
  return updateObject(state, { allocations: action.allocation })
}

const createModel = (state, action) => {
  return updateObject(state, { models: action.model });
}

const createAccountType = (state, action) => {
  return updateObject(state, { accountTypes: action.accountType })
}

const createModelHolding = (state, action) => {
  return updateObject(state, { modelHoldings: action.modelHolding })
}

const createGoal = (state, action) => {
  return updateObject(state, { goals: action.goal })
}

const createClientAdminService = (state, action) => {
  return updateObject(state, { clientsAdminService: action.clientAdminService })
}

const createClientNucleusService = (state, action) => {
  return updateObject(state, { clientsNucleusService: action.clientNucleusService })
}

const createAccount = (state, action) => {
  return updateObject(state, { accounts: action.account })
}

const subscribeAccount = (state, action) => {
  return updateObject(state, { subscriptions: action.subscription })
}

const createPortfolio = (state, action) => {
  return updateObject(state, { portfolios: action.porfolio })
}

const createPortfolioHolding = (state, action) => {
  return updateObject(state, { porfolioHoldings: action.porfolioHolding })
}

const createDecisionTree = (state, action) => {
  return updateObject(state, { decisionTree: action.decisionTree })
}

const createQuestionnaire = (state, action) => {
  return updateObject(state, { questionnaire: action.questionnaire })
}

const createNode = (state, action) => {
  return updateObject(state, { nodes: action.node })
}

const createNodeRelationShip = (state, action) => {
  return updateObject(state, { nodeRelationships: action.nodeRelationship })
}

const createTransactionCodes = (state, action) => {
  return updateObject(state, { transactionCodes: action.nodeRelationship })
}

const createPortfolioTransactions = (state, action) => {
  return updateObject(state, { portfolioTransactions: action.portfolioTransactions })
}

const createPortfolioAssetSize = (state, action) => {
  return updateObject(state, { portfolioAssetSize: action.portfolioTransactions })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ACCOUNT_TYPE: return createAccountType(state, action)
    case actionTypes.CREATE_SECURITY: return createSecurity(state, action)
    case actionTypes.CREATE_ALLOCATION: return createAllocation(state, action)
    case actionTypes.CREATE_GOAL: return createGoal(state, action)
    case actionTypes.CREATE_MODEL: return createModel(state, action)
    case actionTypes.CREATE_MODEL_HOLDING: return createModelHolding(state, action)
    case actionTypes.CREATE_CLIENT_NUCLEUS_SERVICE: return createClientNucleusService(state, action)
    case actionTypes.CREATE_CLIENT_ADMIN_SERVICE: return createClientAdminService(state, action)
    case actionTypes.CREATE_ACCOUNT: return createAccount(state, action)
    case actionTypes.CREATE_PORTFOLIO: return createPortfolio(state, action)
    case actionTypes.CREATE_PORTFOLIO_HOLDING: return createPortfolioHolding(state, action)
    case actionTypes.SUBSCRIBE_ACCOUNT: return subscribeAccount(state, action)
    case actionTypes.CREATE_DECISION_TREE: return createDecisionTree(state, action)
    case actionTypes.CREATE_QUESTIONNAIRE: return createQuestionnaire(state, action)
    case actionTypes.CREATE_NODE: return createNode(state, action)
    case actionTypes.CREATE_NODE_RELATIONSHIP: return createNodeRelationShip(state, action)
    case actionTypes.CREATE_TRANSACTION_CODES: return createTransactionCodes(state, action)
    case actionTypes.CREATE_PORTFOLIO_TRANSACTIONS: return createPortfolioTransactions(state, action)
    case actionTypes.CREATE_PORTFOLIO_ASSET_SIZE: return createPortfolioAssetSize(state, action)
    default: return state
  }
}

export default reducer