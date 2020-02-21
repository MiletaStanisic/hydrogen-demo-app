import { Component } from 'react';
import axios from 'axios';
import { BASE_PATH, CLIENT_CREDENTIALS, AUTHORIZATION_PATH, ADMIN_SERVICE_PATH } from "./configuration";

class Initializer extends Component {

  static getAccessToken = async () => {
    const client_credentials = window.btoa(`${CLIENT_CREDENTIALS}`);
    const headers = {
      'Authorization': `Basic ${client_credentials}`
    };

    const promise = await axios({
      url: `${AUTHORIZATION_PATH}`,
      method: 'POST',
      headers: headers
    })
    return promise;
  }

  static isInitalized = async (accessToken) => {
    const promise = await axios({
      method: 'GET',
      url: `${BASE_PATH}node`,
      headers: { 'Authorization': `Bearer ${accessToken}` },
      params: {
        page: 0,
        size: 25,
        ascending: false
      }
    })
    return promise;
  }

  static getAllAllocations = async (accessToken) => {
    const promise = await axios({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      params: {
        page: 0,
        size: 25
      },
      url: `${BASE_PATH}allocation`
    })
    return promise;
  }

  static updateAllocation = async (accessToken, allocationID, node_map) => {
    const promise = await axios({
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      data: {
        node_map: node_map
      },
      url: `${BASE_PATH}allocation/${allocationID}`
    })
    return promise;
  }

  static updateAccount = async (payload) => {
    const { accessToken, goals, account_id } = payload;
    const promise = await axios({
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      data: {
        goals
      },
      url: `${BASE_PATH}account/${account_id}`
    })
    return promise;
  }

  static deleteAllAccountTypes = async (accessToken) => {
    const promise = await axios({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      params: {
        page: 0,
        size: 25
      },
      url: `${BASE_PATH}account_type`
    })

    promise.data.content.map(async accountType => {

      const response = await axios({
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'content-type': 'application/json'
        },
        method: 'DELETE',
        url: `${BASE_PATH}account_type/${accountType.id}`
      });
      return response;
    })

  }
  static getAllAccountTypes = async (accessToken) => {
    const promise = await axios({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      params: {
        page: 0,
        size: 25
      },
      url: `${BASE_PATH}account_type`
    })
    return promise;
  }

  static deleteAllSecurities = async (accessToken) => {
    const promise = await axios({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      params: {
        page: 0,
        size: 25
      },
      url: `${BASE_PATH}security`
    })

    promise.data.content.map(async security => {

      const response = await axios({
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'content-type': 'application/json'
        },
        method: 'DELETE',
        url: `${BASE_PATH}security/${security.id}`
      });
      return response;
    })
  }

  static getAllSecurities = async (accessToken) => {
    const promise = await axios({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      params: {
        page: 0,
        size: 25
      },
      url: `${BASE_PATH}security`
    })

    return promise;
  }

  static deleteAllAllocations = async (accessToken) => {
    const promise = await axios({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      params: {
        page: 0,
        size: 25
      },
      url: `${BASE_PATH}allocation`
    })

    promise.data.content.map(async allocation => {
      const response = await axios({
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'content-type': 'application/json'
        },
        method: 'DELETE',
        url: `${BASE_PATH}allocation/${allocation.id}`
      });
      return response;
    })


  }

  static deleteAllGoals = async (accessToken) => {
    const promise = await axios({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      params: {
        page: 0,
        size: 25
      },
      url: `${BASE_PATH}goal`
    })

    promise.data.content.map(async goal => {
      const response = await axios({
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'content-type': 'application/json'
        },
        method: 'DELETE',
        url: `${BASE_PATH}goal/${goal.id}`
      });
      return response;
    })
  }

  static getAllGoals = async (accessToken) => {
    const promise = await axios({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      params: {
        page: 0,
        size: 25
      },
      url: `${BASE_PATH}goal`
    })
    return promise;
  }

  static getAllPortfolios = async (accessToken) => {
    const promise = await axios({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      params: {
        page: 0,
        size: 25
      },
      url: `${BASE_PATH}portfolio`
    })
    return promise;
  }



  static updateGoal = async (accessToken, payload) => {
    const promise = await axios({
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      data: {
        questionnaire_id: payload.questionnaire_id
      },
      url: `${BASE_PATH}goal/${payload.goal_id}`
    })
    return promise;
  }

  static deleteAllClientsNucleus = async (accessToken) => {
    const promise = await axios({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      params: {
        page: 0,
        size: 25
      },
      url: `${BASE_PATH}client`
    })

    promise.data.content.map(async client => {
      if (client.id !== "0108a206-16e4-4bb2-b20b-12e952f37a34") {
        const response = await axios({
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'content-type': 'application/json'
          },
          method: 'DELETE',
          url: `${BASE_PATH}client/${client.id}`
        });

        return response;
      } else {
      }
    })
  }

  static deleteAllPortfolioAssetSize = async (accessToken) => {
    const promise = await axios({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      params: {
        page: 0,
        size: 25
      },
      url: `${BASE_PATH}portfolio_asset_size`
    })

    promise.data.content.map(async assetSize => {
      const response = await axios({
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'content-type': 'application/json'
        },
        method: 'DELETE',
        url: `${BASE_PATH}portfolio_asset_size/${assetSize.id}`
      });
      return response;
    })
  }


  static getAdminServiceClient = async (payload, accessToken) => {
    const promise = await axios({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      params: {
        "filter": `username==${payload}`
      },
      url: `${ADMIN_SERVICE_PATH}`,
    })
    return promise;
  }

  static getAllNucleusServiceClients = async (accessToken) => {
    const promise = await axios({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      url: `${BASE_PATH}client`,
    })
    return promise;
  }


  static deleteAllAccounts = async (accessToken) => {
    const promise = await axios({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      params: {
        page: 0,
        size: 25
      },
      url: `${BASE_PATH}account`
    });

    promise.data.content.map(async account => {
      const response = await axios({
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'content-type': 'application/json'
        },
        method: 'DELETE',
        url: `${BASE_PATH}account/${account.id}`
      });
      return response;
    });
  }

  static deleteAllPortfolios = async (accessToken) => {
    const promise = await axios({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      params: {
        page: 0,
        size: 25
      },
      url: `${BASE_PATH}portfolio`
    })

    promise.data.content.map(async portfolio => {
      const response = await axios({
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'content-type': 'application/json'
        },
        method: 'DELETE',
        url: `${BASE_PATH}portfolio/${portfolio.id}`
      });
      return response;
    });
  }

  static deleteAllPortfolioHoldings = async (accessToken) => {
    const promise = await axios({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      params: {
        page: 0,
        size: 25
      },
      url: `${BASE_PATH}portfolio_holding`
    })

    promise.data.content.map(async portfolioHolding => {
      const response = await axios({
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'content-type': 'application/json'
        },
        method: 'DELETE',
        url: `${BASE_PATH}portfolio_holding/${portfolioHolding.id}`
      });
      return response;
    })
  }

  static deleteAllModels = async (accessToken) => {
    const promise = await axios({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      params: {
        page: 0,
        size: 25
      },
      url: `${BASE_PATH}model`
    })

    promise.data.content.map(async model => {
      const response = await axios({
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'content-type': 'application/json'
        },
        method: 'DELETE',
        url: `${BASE_PATH}model/${model.id}`
      });
      return response;
    })
  }
  static deleteAllDecisionTrees = async (accessToken) => {
    const promise = await axios({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      params: {
        page: 0,
        size: 25
      },
      url: `${BASE_PATH}decision_tree`
    })

    promise.data.content.map(async tree => {
      const response = await axios({
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'content-type': 'application/json'
        },
        method: 'DELETE',
        url: `${BASE_PATH}decision_tree/${tree.id}`
      });
      return response;
    })
  }

  static deleteAllQuestionnaires = async (accessToken) => {
    const promise = await axios({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      params: {
        page: 0,
        size: 25
      },
      url: `${BASE_PATH}questionnaire`
    })

    promise.data.content.map(async questionnaire => {
      const response = await axios({
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'content-type': 'application/json'
        },
        method: 'DELETE',
        url: `${BASE_PATH}questionnaire/${questionnaire.id}`
      });
      return response;
    })

  }

  static deleteAllNodes = async (accessToken) => {
    const promise = await axios({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      params: {
        page: 0,
        size: 25
      },
      url: `${BASE_PATH}node`
    })

    promise.data.content.map(async node => {
      const response = await axios({
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'content-type': 'application/json'
        },
        method: 'DELETE',
        url: `${BASE_PATH}node/${node.id}`
      });
      return response;
    })

  }

  static getAllNodes = async (accessToken) => {
    const promise = await axios({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      params: {
        page: 0,
        size: 25
      },
      url: `${BASE_PATH}node`
    })

    return promise;
  }

  static deleteAllNodeRelationships = async (accessToken) => {
    const promise = await axios({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      params: {
        page: 0,
        size: 25
      },
      url: `${BASE_PATH}node_relationship`
    })

    promise.data.content.map(async nodeRelationship => {
      const response = await axios({
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'content-type': 'application/json'
        },
        method: 'DELETE',
        url: `${BASE_PATH}node_relationship/${nodeRelationship.id}`
      });
      return response;
    })

  }

  static deleteAllPortfolioTransactions = async (accessToken) => {
    const promise = await axios({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      params: {
        page: 0,
        size: 25
      },
      url: `${BASE_PATH}portfolio_transaction`
    })

    promise.data.content.map(async portfolio_transaction => {
      const response = await axios({
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'content-type': 'application/json'
        },
        method: 'DELETE',
        url: `${BASE_PATH}portfolio_transaction/${portfolio_transaction.id}`
      });
      return response;
    })

  }

  static authenticateUser = async (payload) => {
    const { username, password } = payload;
    const client_credentials = window.btoa(CLIENT_CREDENTIALS);
    const promise = await axios({
      headers: {
        'Authorization': `Basic ${client_credentials}`
      },
      url: `https://sandbox.hydrogenplatform.com/authorization/v1/oauth/token?grant_type=password&username=${username}&password=${password}`,
      method: 'POST',
    })
    return promise;
  }

  static allocationComposition = async (accessToken, payload) => {
    const { current_weight, strategic_weight, date, model_id, allocation_id } = payload;
    const response = await axios({
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      url: `${BASE_PATH}allocation_composition`,
      data: {
        current_weight: current_weight,
        strategic_weight: strategic_weight,
        date: date,
        allocation_id: allocation_id,
        model_id: model_id
      }
    })
    return response;
  }

  static deleteAllocationComposition = async (accessToken) => {
    const promise = await axios({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      url: `${BASE_PATH}allocation_composition`,
      params: {
        page: 0,
        size: 25
      },
    })
    promise.data.content.map(async composition => {
      const response = await axios({
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'content-type': 'application/json'
        },
        method: 'DELETE',
        url: `${BASE_PATH}allocation_composition/${composition.id}`
      });
      return response;
    })
  }

  static deleteTransactionCodes = async (accessToken) => {
    const promise = await axios({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      url: `${BASE_PATH}transaction_code`,
      params: {
        page: 0,
        size: 25
      },
    })
    promise.data.content.map(async code => {
      const response = await axios({
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'content-type': 'application/json'
        },
        method: 'DELETE',
        url: `${BASE_PATH}transaction_code/${code.id}`
      });
      return response;
    })
  }

  static deleteFundings = async (accessToken) => {
    const promise = await axios({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      url: `${BASE_PATH}funding`,
      params: {
        page: 0,
        size: 25
      },
    })
    promise.data.content.map(async funding => {
      const response = await axios({
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'content-type': 'application/json'
        },
        method: 'DELETE',
        url: `${BASE_PATH}funding/${funding.id}`
      });
      return response;
    })
  }

  static getAccountPortifolio = async (payload, accessToken) => {
    const promise = await axios({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      url: `${BASE_PATH}portfolio`,
      params: {
        "filter": `account_id==${payload}`
      }
    })
    return promise;
  }


  static clearAll = async (accessToken) => {
    await this.deleteAllAccountTypes(accessToken);
    await this.deleteAllSecurities(accessToken);
    await this.deleteAllAllocations(accessToken);
    await this.deleteAllGoals(accessToken);
    await this.deleteAllAccounts(accessToken);
    await this.deleteAllPortfolios(accessToken);
    await this.deleteAllPortfolioHoldings(accessToken);
    await this.deleteAllPortfolioTransactions(accessToken);
    await this.deleteAllocationComposition(accessToken);
    await this.deleteFundings(accessToken);
    await this.deleteAllModels(accessToken);
    await this.deleteTransactionCodes(accessToken);
    await this.deleteAllQuestionnaires(accessToken);
    await this.deleteAllDecisionTrees(accessToken);
    await this.deleteAllNodes(accessToken);
    await this.deleteAllNodeRelationships(accessToken);
    await this.deleteAllClientsNucleus(accessToken);
    await this.deleteAllPortfolioAssetSize(accessToken);
    return true;
  };
}


export default Initializer;