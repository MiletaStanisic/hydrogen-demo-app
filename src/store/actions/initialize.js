import * as actionTypes from './actionTypes'
import axios from 'axios'
import { BASE_PATH, ADMIN_SERVICE_PATH } from '../../configuration'

export const createSecurity = payload => async (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  const { name, security_class, ticker, asset_class, is_active } = payload;

  const response = await axios({
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}security`,
    data: {
      name: name,
      security_class: security_class,
      ticker: ticker,
      asset_class: asset_class,
      is_active: is_active
    }
  })
  dispatch({
    type: actionTypes.CREATE_SECURITY,
    security: response.data
  })
  return response;
}

export const createAllocation = payload => async (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  const { name, description, is_active, volatility, performance } = payload;
  try {
    const response = await axios({
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      url: `${BASE_PATH}allocation`,
      data: {
        name: name,
        description: description,
        is_active: is_active,
        volatility: volatility,
        performance: performance
      }
    })
    if (response.status === 200) {
      dispatch({
        type: actionTypes.CREATE_ALLOCATION,
        allocation: response.data
      })
      return response;
    }
  }
  catch (err) {
    console.log(err);
  }

}

export const createAccountType = payload => async (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  const { name, code, is_taxable, short_name } = payload;

  const response = await axios({
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}account_type`,
    data: {
      name: name,
      code: code,
      is_taxable: is_taxable,
      short_name: short_name
    }
  })
  dispatch({
    type: actionTypes.CREATE_ACCOUNT_TYPE,
    accountType: response.data
  })
  return response;
}

export const createPortfolioTransactions = payload => async (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  const { price, quantity, date, portfolio_id, security_id, model_id, transaction_code_id, account_id } = payload;

  const response = await axios({
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}portfolio_transaction`,
    data: {
      price,
      quantity,
      date,
      security_id,
      portfolio_id,
      model_id,
      account_id,
      transaction_code_id
    }
  })
  dispatch({
    type: actionTypes.CREATE_PORTFOLIO_TRANSACTIONS,
    portfolioTransactions: response.data
  })
  return response;
}

export const createPortfolioAssetSize = payload => async (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  const { asset_size, cash_flow, date, portfolio_id, currency_code } = payload;

  const response = await axios({
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}portfolio_asset_size`,
    data: {
      asset_size,
      cash_flow,
      date,
      currency_code,
      portfolio_id
    }
  })
  dispatch({
    type: actionTypes.CREATE_PORTFOLIO_ASSET_SIZE,
    portfolioAssetSize: response.data
  })
  return response;
}


export const createModel = payload => async (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  const { name, description } = payload;
  try {
    const response = await axios({
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      url: `${BASE_PATH}model`,
      data: {
        name: name,
        description: description
      }
    })
    if (response.status === 200) {
      dispatch({
        type: actionTypes.CREATE_MODEL,
        model: response.data
      })
      return response;
    }
  }
  catch (err) {
    console.log(err);
  }
}

export const createModelHolding = (payload, securityID, modelID) => async (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  const { current_weight, strategic_weight, date } = payload;

  try {
    const response = await axios({
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      url: `${BASE_PATH}model_holding`,
      data: {
        current_weight: current_weight,
        strategic_weight: strategic_weight,
        date: date,
        security_id: securityID,
        model_id: modelID
      }
    })
    if (response.status === 200) {
      dispatch({
        type: actionTypes.CREATE_MODEL_HOLDING,
        modelHolding: response.data
      })
      return response;
    }
  }
  catch (err) {
    console.log(err);
  }

}

export const createGoal = (payload, parentGoalID) => async (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  const { name, is_decumulation, image } = payload;
  const response = await axios({
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}goal`,
    data: {
      name: name,
      is_decumulation: is_decumulation,
      parent_goal_id: parentGoalID || null,
      metadata: {
        image: image
      }
    }
  })
  dispatch({
    type: actionTypes.CREATE_GOAL,
    goal: response.data
  })
  return response;
}

export const createClientAdminService = (payload, username) => async (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  const { password, authorities } = payload;

  const response = await axios({
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${ADMIN_SERVICE_PATH}`,
    data: {
      username: username,
      password: password,
      authorities: authorities
    }
  })
  dispatch({
    type: actionTypes.CREATE_CLIENT_ADMIN_SERVICE,
    clientAdminService: response.data
  })
  return response;
}

export const createClientNucleusService = payload => async (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  const { first_name, last_name, email, phone_number, client_type } = payload;
  const response = await axios({
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}client`,
    data: {
      first_name: first_name,
      last_name: last_name,
      username: email,
      client_type: client_type,
      email: email,
      phone_number: phone_number,
    }
  })
  dispatch({
    type: actionTypes.CREATE_CLIENT_NUCLEUS_SERVICE,
    clientNucleusService: response.data
  })
  return response;
}

export const createAccount = (payload, clientNucleusId, accountTypeID, client) => async (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  const { name } = payload;
  const { client_account_association_type } = client;

  const response = await axios({
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}account`,
    data: {
      name: name,
      account_type_id: accountTypeID,
      clients: [{
        client_id: clientNucleusId,
        client_account_association_type: client_account_association_type
      }]
    }
  })
  dispatch({
    type: actionTypes.CREATE_ACCOUNT,
    account: response.data
  })
  return response;
}

export const subscribeAccount = (payload) => async (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  const { current_weight, strategic_weight, date, account_id, goal_id, allocation_id } = payload;
  const response = await axios({
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}account/${account_id}/subscribe`,
    data: {
      current_weight: current_weight,
      strategic_weight: strategic_weight,
      date: date,
      allocation_id: allocation_id,
      goal_id: goal_id
    }
  })
  dispatch({
    type: actionTypes.SUBSCRIBE_ACCOUNT,
    subscription: response.data
  })
  return response;
}

export const createPortfolio = (payload, accountID, modelID) => async (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  const { name, percentage } = payload;

  const response = await axios({
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}portfolio`,
    data: {
      name: name,
      percentage: percentage,
      account_id: accountID,
      model_id: modelID
    }
  })
  dispatch({
    type: actionTypes.CREATE_PORTFOLIO,
    portfolio: response.data
  })
  return response;
}


export const createPortfolioHolding = (payload) => async (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  const { amount, shares, date, weight, portfolio_id, security_id } = payload;
  const response = await axios({
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}portfolio_holding`,
    data: {
      portfolio_id: portfolio_id,
      amount: amount,
      shares: shares,
      date: date,
      weight: weight,
      security_id: security_id
    }
  })
  dispatch({
    type: actionTypes.CREATE_PORTFOLIO_HOLDING,
    portfolioHolding: response.data
  })
  return response;
}

export const createDecisionTree = payload => async (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  const { name, description } = payload;

  const response = await axios({
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}decision_tree`,
    data: {
      name: name,
      description: description
    }
  })
  dispatch({
    type: actionTypes.CREATE_DECISION_TREE,
    decisionTree: response.data
  })
  return response;
}

export const createQuestionnaire = (payload, decisionTreeID) => async (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  const { name, description, questions } = payload;

  const response = await axios({
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}questionnaire`,
    data: {
      name: name,
      description: description,
      decision_tree_id: decisionTreeID,
      questions: questions
    }
  })
  dispatch({
    type: actionTypes.CREATE_QUESTIONNAIRE,
    questionnaire: response.data
  })
  return response;
}

export const createNode = payload => async (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  const { name, questionID, is_first } = payload;
  const response = await axios({
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}node`,
    data: {
      name: name,
      question_id: questionID,
      is_first: is_first
    }
  })
  dispatch({
    type: actionTypes.CREATE_NODE,
    node: response.data
  })
  return response;
}

export const createNodeRelationShip = payload => async (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  const { answer, decisionTreeID, nodeParentID, isLeaf } = payload;
  if (payload && payload.nodeChildID) {
    const nodeChildID = payload.nodeChildID;
    const response = await axios({
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      url: `${BASE_PATH}node_relationship`,
      data: {
        value: answer.value,
        answer_id: answer.id,
        decision_tree_id: decisionTreeID,
        node_parent_id: nodeParentID,
        node_child_id: nodeChildID,
        is_leaf: isLeaf
      }
    })
    dispatch({
      type: actionTypes.CREATE_NODE_RELATIONSHIP,
      nodeRelationship: response.data
    })
    return response;

  } else {
    const response = await axios({
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      url: `${BASE_PATH}node_relationship`,
      data: {
        value: answer.value,
        answer_id: answer.id,
        decision_tree_id: decisionTreeID,
        node_parent_id: nodeParentID,
        is_leaf: isLeaf
      }
    })
    dispatch({
      type: actionTypes.CREATE_NODE_RELATIONSHIP,
      nodeRelationship: response.data
    })
    return response;
  }
}

export const createTransactionCodes = payload => async (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  const { category, is_buy, transaction_code, transaction_code_description } = payload;
  const response = await axios({
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    url: `${BASE_PATH}transaction_code`,
    data: {
      category,
      is_buy,
      transaction_code,
      transaction_code_description,
    }
  })
  dispatch({
    type: actionTypes.CREATE_TRANSACTION_CODES,
    transactionCodes: response.data
  })
  return response;
}
