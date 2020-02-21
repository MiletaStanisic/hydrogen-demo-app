import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import { Button, Card } from 'react-bootstrap';
import { withRouter } from "react-router-dom";

import { connect } from 'react-redux';
import Initializer from '../Initializer';
import { getRandomInt } from './helpers'
import {
  createSecurity,
  createDecisionTree,
  createQuestionnaire,
  createNode,
  createNodeRelationShip,
  createAllocation,
  createModel,
  createGoal,
  createAccountType,
  createClientNucleusService,
  createClientAdminService,
  createAccount,
  createPortfolio,
  createPortfolioHolding,
  createModelHolding,
  getAccountPortifolio,
  subscribeAccount,
  createFunding,
} from '../store/actions/index';
import { createTransactionCodes,createPortfolioTransactions, createPortfolioAssetSize } from '../store/actions/initialize';

const LoginButton = withRouter(({ history }) => (
  <Button    
    size="md"
    variant="success"
    onClick={() => {history.push('/login') }}
    className="btnGoToLogin">Go to login
  </Button>
))

const SmallButton = withRouter(({ history }) => (
  <Button
    style={{ float: 'right' }}
    size="md"
    variant="success"
    onClick={() => { history.push('/login') }}
    className="btnGoToLogin">Go to login
  </Button>
))

const DisabledButton = () => (
  <Button
    style={{ float: 'right' }}
    disabled
    size="md"
    variant="secondary"
    className="btnGoToLogin">Go to login
  </Button>
)

const AlertComponent = ({ variant, name }) => (
  <Alert variant={variant}>{name}</Alert>
);
class RequestCheckerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialData: {},
      decisionTree: {
        IDs: []
      },
      allAllocations: [],
      allModels: [],
      allModelHoldings: [],
      tranCodes: [],
      isButtonRender: false,
      isAccountPassed: false,
      isSecurityPassed: false,
      isModelPassed: false,
      isAllocationPassed: false,
      isGoalPassed: false,
      isModelHoldingPassed: false,
      isSubcriptionPassed: false,
      isAccountTypePassed: false,
      isClientPassed: false,
      isDecisionTreePassed: false,
      isQuestionnairePassed: false,
      isNodePassed: false,
      isNodeRelationshipPassed: false,
      accountMessage: '',
      resetingState: false
    }
  };
  async componentDidMount() {
    const { handleRenderButton, isShow } = this.props;
    if (!isShow) {
      handleRenderButton(true);
    }

    await this.setupEnviroment();
  }

  setupEnviroment = async () => {
    const {
      initialData,
      onCreateSecurity,
      onCreateDecisionTree,
      onCreateQuestionnaire,
      onCreateNode,
      onCreateNodeRelationship,
      onCreateAllocation,
      onCreateModel,
      onCreateModelHolding,
      onCreateGoal,
      onCreateAccountType,
      onCreateClientOnNucleusService,
      onCreateClientOnAdminService,
      onCreateAccount,
      onSubcribeAccount,
      onCreatePortfolioHolding,
      onCreateTransactionCodes,
      onCreatePortfolioTransactions,
      onCreatePortfolioAssetSize,
      accessToken,
      setPrevButton,
      onCreateFunding
    } = this.props;

    const { accountTypes, securities, allocations, goals, clients, decision_tree, transaction_codes } = initialData;
    const { decision_paths } = decision_tree;
    const {
      getAllAllocations,
      updateAllocation,
      updateGoal,
      getAllGoals,
      getAllSecurities,
      getAllAccountTypes,
      allocationComposition,
      getAccountPortifolio,
      updateAccount,
      clearAll      
    } = Initializer;
    
    
    await clearAll(accessToken);
    this.setState({ resetingState: true });

    //ACCOUNT TYPES
    for (const account of accountTypes) {
      await onCreateAccountType(account);
    }
    this.setState({ isAccountTypePassed: true });

    // //SECURITIES
    for (const security of securities) {
      await onCreateSecurity(security);
    }
    this.setState({ isSecurityPassed: true });

    //ALLOCATIONS
    for (const allocation of allocations) {
      const allocationResponse = await onCreateAllocation(allocation);
      this.setState({ isAllocationPassed: true });
      
      this.setState(prevState => ({
        allAllocations: [...prevState.allAllocations, allocationResponse.data ]
      }));
      
      const securitiesResponse = await getAllSecurities(accessToken);

      //MODELS

      for (const model of allocation.models) {
        const response = await onCreateModel(model);
        
        this.setState(prevState => ({
          allModels: [...prevState.allModels, response.data ]
        }));

        const compositionPayload = {
          current_weight: model.current_weight,
          strategic_weight: model.strategic_weight,
          allocation_id: allocationResponse.data.id,
          date: model.date,
          model_id: response.data.id
        }
        await allocationComposition(accessToken, compositionPayload);

        for (const holding of model.holdings) {
          const filteredSecurities =
            securitiesResponse.data.content.filter(security => security.ticker.localeCompare(holding.security_ticker) === 0);
          
          const security_id = filteredSecurities[0].id;
          const modelHoldingResponse = await onCreateModelHolding(holding, security_id, response.data.id);

          this.setState(prevState => ({
            allModelHoldings: [...prevState.allModelHoldings, modelHoldingResponse.data ]
          }));
        };
      }
      this.setState({ isModelPassed: true });
      this.setState({ isModelHoldingPassed: true });
    }

    //GOALS
    for (const goal of goals) {
      const goalResponse = await onCreateGoal(goal, null);
      if (goal && goal.children) {
        for (const child of goal.children) {
          await onCreateGoal(child, goalResponse.data.id);
        }
      }
    }
    this.setState({ isGoalPassed: true });


    //TRANSACTION CODES
    for (const code of transaction_codes) {
      const { category, is_buy, transaction_code, transaction_code_description } = code;
      const payload = { 
        category,
        is_buy,
        transaction_code,
        transaction_code_description
      }
      const transCodesRes = await onCreateTransactionCodes(payload);
      this.setState(prevState => ({
        tranCodes: [...prevState.tranCodes, transCodesRes.data ]
      }));
    }

    //CLIENTS
    for (const client of clients) {

      //this is hardcoded for purposes of a demo since Nucleus refuses to cleate client with the same email again
      let clientNucleusId;
      if (client.email === 'hydrogen1@demo.com') {
        clientNucleusId = "0108a206-16e4-4bb2-b20b-12e952f37a34";
      } else {
        const clientNucleusResponse = await onCreateClientOnNucleusService(client);
        clientNucleusId = clientNucleusResponse.data.id;
        await onCreateClientOnAdminService(client, client.email);

      }
      this.setState({ isClientPassed: true });
      
      //ACCOUNT
      for (const account of client.accounts) {
        const allAccounts = await getAllAccountTypes(accessToken);
        const goalsResponse = await getAllGoals(accessToken);

        const filteredAccount = allAccounts.data.content.find(acc => acc.name.localeCompare(account.accout_type_name) === 0);
        const accountResponse = await onCreateAccount(account, clientNucleusId, filteredAccount.id, client);

        const allocationResponse = await getAllAllocations(accessToken);
        const allocation = allocationResponse.data.content.filter(allocation => allocation.name.localeCompare(account.allocation_name) === 0);
        
        for (const goal of account.goals) {
          const filteredGoal = goalsResponse.data.content.filter(g => g.name === goal.goal_name);
          const payload = {
            account_id: accountResponse.data.id,
            accessToken: accessToken,
            goals: [
              {
                goal_id: filteredGoal[0].id,
                goal_amount: goal.goal_amount,
                accumulation_horizon: goal.accumulation_horizon
              }
            ]
          }
          await updateAccount(payload);
        }
        const goal = account.goals.map(g => {
          const filter = goalsResponse.data.content.filter(res => res.name.localeCompare(g.goal_name) === 0);
          return filter[0];
        });

        const data = {
          account_id: accountResponse.data.id,
          goal_id: goal[0].id,
          allocation_id: allocation[0].id,
          current_weight: account.current_weight,
          strategic_weight: account.strategic_weight,
          date: account.date,
        }
        await onSubcribeAccount(data);

        const accountPorfolios = await getAccountPortifolio(accountResponse.data.id, accessToken);

        const { allModels, allModelHoldings } = this.state;
        const { cash } = account;

        for (const portfolio of accountPorfolios.data.content) {
          const model = allModels.filter(m => m.id === portfolio.model_id);
          const modelHoldings = allModelHoldings.filter(h => h.model_id === model[0].id);

          for (const holding of modelHoldings) {
            const { cash } = account;
            const weight = holding.current_weight / 100;
            const amount = cash * weight;
            const sec_fix_price = 10;
            const shares = amount / sec_fix_price;

            const payload = {
              shares,
              weight: holding.current_weight,
              amount: amount,
              date: '2018-02-01',
              security_id: holding.security_id,
              portfolio_id: portfolio.id
            }
            await onCreatePortfolioHolding(payload);
            const { tranCodes } = this.state;
            const buyTransaction = tranCodes.filter(code => code.is_buy);

            const transactionPayload = {
              price: cash,
              quantity: amount,
              date: '2018-02-01',
              security_id: holding.security_id,
              portfolio_id: portfolio.id,
              model_id: model[0].id,
              account_id: accountResponse.data.id,
              transaction_code_id: buyTransaction[0].id
            }
            await onCreatePortfolioTransactions(transactionPayload);
          }
          
          // SIMULATION ON PORFOLIO ASSET SIZE GROWTH
          const fundingPayload = {
            amount: 200,
            accountId: accountResponse.data.id,
            frequencyUnit: 'monthly'
          }
          onCreateFunding(fundingPayload);

          const dates = ["2018-02-01",
            "2018-03-01", "2018-04-01",
            "2018-05-01", "2018-06-01",
            "2018-07-01", "2018-08-01",
            "2018-09-01", "2018-10-01",
            "2018-11-01", "2018-12-01",
            "2019-01-01"];
          
          


          const assetSizePayload = {
            asset_size: cash,
            cash_flow: cash,
            date: '2018-01-01',
            portfolio_id: portfolio.id
          }
          await onCreatePortfolioAssetSize(assetSizePayload);
          
          // AGGRESSIVE - 11%, MODERATE-AGGRESSIVE 7%, MODERATE 5%, CONSERVATIVE 2% per year
          let assetsGrowth = cash;
          for (const date of dates) {
            if (allocation[0].name === "Aggressive Allocation")
              assetsGrowth = (assetsGrowth * (1 + 0.13 / 12) * getRandomInt(1,11));
            if (allocation[0].name === "Moderate-Aggressive Allocation")
              assetsGrowth = (assetsGrowth * (1 + 0.1 / 12) * getRandomInt(1,8));
            if (allocation[0].name === "Moderate Allocation")
              assetsGrowth = (assetsGrowth * (1 + 0.08 / 12) * getRandomInt(1,5));
            if (allocation[0].name === "Conservative Allocation")
              assetsGrowth = (assetsGrowth * (1 + 0.04 / 12) * getRandomInt(1,3));

            const assetSizePayload = {
              asset_size: assetsGrowth,
              cash_flow: 0,
              date: date,
              portfolio_id: portfolio.id
            }
            await onCreatePortfolioAssetSize(assetSizePayload);
          }



          //END OF SIMULATION
        }
      }
    }

    this.setState({ isAccountPassed: true });
    this.setState({ isSubcriptionPassed: true });

    // DECISION TREE AND QUESTIONNAIRE
    const decisionTreeResponse = await onCreateDecisionTree(decision_tree);
    this.setState({ isDecisionTreePassed: true });

    this.setState(prevState => ({
      decisionTree: { ...prevState.decisionTree, IDs: decisionTreeResponse.data.id, isFailed: !decisionTreeResponse.data.id }
    }));

    const { IDs } = this.state.decisionTree;

    const questionnaireResponse = await onCreateQuestionnaire(decision_tree.questionnaire, IDs)
    this.setState({ isQuestionnairePassed: true });

    // ADD QUESTIONNAIRE ID TO GOALS
    const allGoals = await getAllGoals(accessToken);

    for (const goal of allGoals.data.content) {
      const payload = {
        questionnaire_id: questionnaireResponse.id,
        goal_id: goal.id
      }
      await updateGoal(accessToken, payload);
    }

    const { questionnaire } = this.props;
    const listAllAllocations = await getAllAllocations(accessToken);

    const parentNode = questionnaire.questions.filter(question => decision_paths.question === question.title);
    const payload = {
      name: "Time horizon question node",
      questionID: parentNode[0].id,
      is_first: true
    }
    const nodeResponse = await onCreateNode(payload);

    for (const relation of decision_paths.answers) {
      const childQuestion = questionnaire.questions.filter(q => q.title.localeCompare(relation.leads_to.question) === 0);
      const payload = {
        name: "Risk question, " + relation.answer,
        questionID: childQuestion[0].id,
        is_first: false
      }
      const nodeChildResponse = await onCreateNode(payload);

      for (const answer of parentNode[0].answers) {
        answer.value = answer.value.replace('&lt;', '<');
        answer.value = answer.value.replace('&gt;', '>');

        if (answer.value === relation.answer) {
          const { IDs } = this.state.decisionTree;
          const payload = {
            answer: answer,
            decisionTreeID: IDs,
            nodeParentID: nodeResponse.data.id,
            nodeChildID: nodeChildResponse.data.id,
            isLeaf: false
          }
          await onCreateNodeRelationship(payload);
        }
      }

      const riskQuestion = questionnaire.questions.filter(question => relation.leads_to.question === question.title);

      const leafRelationships = riskQuestion[0].answers.filter(async answer => relation.leads_to.answers.includes(answer));
      for (const leaf of leafRelationships) {
        const data = {
          answer: leaf,
          decisionTreeID: IDs,
          nodeParentID: nodeChildResponse.data.id,
          isLeaf: true
        }

        await onCreateNodeRelationship(data);
      }
      for (const leaf of relation.leads_to.answers) {
        const filter = listAllAllocations.data.content.filter(allocation => leaf.leads_to.allocation.localeCompare(allocation.name) === 0);
        const node_map = filter[0].node_map;
        node_map.push({ node_id: nodeChildResponse.data.id });
        await updateAllocation(accessToken, filter[0].id, node_map);
      }
    }
    this.setState({ isNodePassed: true });
    this.setState({ isNodeRelationshipPassed: true });
    setPrevButton(false);
  }

  render() {
    const {
      resetingState,
      isAccountTypePassed,
      isAllocationPassed,
      isSubcriptionPassed,
      isGoalPassed,
      isModelPassed,
      isModelHoldingPassed,
      isClientPassed,
      isDecisionTreePassed,
      isQuestionnairePassed,
      isNodePassed,
      isNodeRelationshipPassed,
      isAccountPassed,
      isSecurityPassed,
      accountMessage
    } = this.state;

    const arrayRequests = [
      {
        name: 'Reseting state',
        isPassed: resetingState,
      },
      {
        name: 'Account types',
        isPassed: isAccountTypePassed
      },
      {
        name: 'Securities',
        isPassed: isSecurityPassed
      },
      {
        name: 'Allocations',
        isPassed: isAllocationPassed
      },
      {
        name: 'Models',
        isPassed: isModelPassed
      },
      {
        name: 'Model holdings',
        isPassed: isModelHoldingPassed
      },
      {
        name: 'Goals',
        isPassed: isGoalPassed
      },
      {
        name: 'Clients ' + accountMessage,
        isPassed: isClientPassed
      },
      {
        name: 'Account',
        isPassed: isAccountPassed
      },
      {
        name: 'Subscription',
        isPassed: isSubcriptionPassed
      },
      {
        name: 'Decision Tree',
        isPassed: isDecisionTreePassed
      },
      {
        name: 'Questionnaire',
        isPassed: isQuestionnairePassed
      },
      {
        name: 'Nodes',
        isPassed: isNodePassed
      },
      {
        name: 'Node relationships',
        isPassed: isNodeRelationshipPassed
      }
    ];
    const listItems = arrayRequests.map((req, index) => {
      if (req.isPassed)
        return <AlertComponent key={index} name={req.name} variant='success'> </AlertComponent>
      else {
        return <AlertComponent key={index} name={req.name} variant='warning'> </AlertComponent>
      }
    });

    const isButtonRender = (
      isAccountTypePassed &&
      isSecurityPassed &&
      isAllocationPassed &&
      isGoalPassed &&
      isModelPassed &&
      isModelHoldingPassed &&
      isClientPassed &&
      isSubcriptionPassed &&
      isAccountPassed &&
      isDecisionTreePassed &&
      isQuestionnairePassed &&
      isNodePassed &&
      isNodeRelationshipPassed
    );
    
    return (
      <div ref={(el) => { this.messagesEnd = el; }} className="requestsStateItems">
        <Card className="jsonCard">
          <Card.Header as="h4">
            Initialization {isButtonRender ? <SmallButton /> : <DisabledButton />}
          </Card.Header>
          <Card.Body>
            {listItems}
          </Card.Body>
        </Card>
        {isButtonRender ? <LoginButton /> : <></>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userAccessToken: state.user.userAccessToken,
  accountTypes: state.initialize.accountTypes,
  securities: state.initialize.securities,
  allocation: state.initialize.allocations,
  goals: state.initialize.goals,
  models: state.initialize.models,
  modelHoldings: state.initialize.modelHoldings,
  accounts: state.initialize.accounts,
  portfolios: state.initialize.portfolios,
  portfolioHoldings: state.initialize.portfolioHoldings,
  decisionTree: state.initialize.decisionTree,
  questionnaire: state.initialize.questionnaire,
  nodes: state.initialize.nodes,
  nodeRelationships: state.initialize.nodeRelationships,
  clientsAdminService: state.initialize.clientsAdminService,
  clientsNucleusService: state.initialize.clientsNucleusService,
  subscriptions: state.initialize.subscriptions,
  transactionCodes: state.initialize.transactionCodes,
  allAccountPortfolios: state.accounts.accountPortifolio,
});

const mapDispatchToProps = dispatch => ({
  onCreateSecurity: payload => dispatch(createSecurity(payload)),
  onCreateAllocation: payload => dispatch(createAllocation(payload)),
  onCreateModel: payload => dispatch(createModel(payload)),
  onCreateModelHolding: (payload, security_id, model_id) => dispatch(createModelHolding(payload, security_id, model_id)),
  onCreateGoal: (payload, parentGoal) => dispatch(createGoal(payload, parentGoal)),
  onCreateDecisionTree: payload => dispatch(createDecisionTree(payload)),
  onCreateQuestionnaire: (payload, decisionTreeID) => dispatch(createQuestionnaire(payload, decisionTreeID)),
  onCreateNode: (payload) => dispatch(createNode(payload)),
  onCreateNodeRelationship: (payload) => dispatch(createNodeRelationShip(payload)),
  onCreateAccountType: (payload) => dispatch(createAccountType(payload)),
  onCreateClientOnNucleusService: (payload) => dispatch(createClientNucleusService(payload)),
  onCreateClientOnAdminService: (payload, username) => dispatch(createClientAdminService(payload, username)),
  onCreateAccount: (payload, clientNucleus, accountTypeID, client) => dispatch(createAccount(payload, clientNucleus, accountTypeID, client)),
  onCreatePortfolio: (payload, accountID, modelID) => dispatch(createPortfolio(payload, accountID, modelID)),
  onCreatePortfolioHolding: (payload) => dispatch(createPortfolioHolding(payload)),
  onSubcribeAccount: payload => dispatch(subscribeAccount(payload)),
  onCreateTransactionCodes: payload => dispatch(createTransactionCodes(payload)),
  onGetAccountPortifolio: payload => dispatch(getAccountPortifolio(payload)),
  onCreatePortfolioTransactions: payload => dispatch(createPortfolioTransactions(payload)),
  onCreatePortfolioAssetSize: payload => dispatch(createPortfolioAssetSize(payload)),
  onCreateFunding: payload => dispatch(createFunding(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestCheckerComponent);