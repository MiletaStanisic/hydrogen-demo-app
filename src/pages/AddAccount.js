import React, { Component } from "react";
import { connect } from "react-redux";
import StepZilla from "react-stepzilla";

import { SelectGoal, CustumizeGoal, Questionnaire, FundAccount } from "./steps";
import { subscribeAccountClear, accountPortfolioHoldingClear } from "../store/actions/accounts";
import SpinnerComponent from ".././components/SpinnerComponent";
import Navbar from "../components/Navbar";
import Auth from "../auth";
import Initializer from "../Initializer";
import { getRandomInt } from './helpers'
import {
  getGoals,
  getGoal,
  getQuestionnaires,
  getNodes,
  getNodeRelationships,
  getAccountPortifolioHoldings,
  createPortifolioTransaction,
  getAllocations,
  createPortifolioAssetSize,
  getAccountTypes,
  createAccountt,
  getUser,
  getClientAssetSize,
  createPortfolioHoldingg,
  createFunding,
  logoutUser,
  setAccount
} from "../store/actions/index";

import "../styles/react-stepzilla/react-stepzilla.scss";
import "../styles/steps.scss";
import "../styles/element/css/element.css";


const StepTitle = ({ title, description, icon, doneIcon }) => {
  return (
    <span>
      {doneIcon ? <span className={`stepzilla-done-icon ${doneIcon}`} /> : ""}
      <span className={`stepzilla-icon ${icon}`} />
      <span className="stepzilla-title">{title}</span>
      {description ? (
        <span className="stepzilla-desctiption">{description}</span>
      ) : (
        ""
      )}
    </span>
  );
};

class AddAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      currentQuestion: {},
      allocation: {},
      selectedGoal: {},
      customGoal: {},
      answerChecked: "",
      loading: false,
      isNextDisabled: true,
      accountNumber: "",
      buyStocksAmount: null,
      isDeleting: false,
      monthlyDeposit: null,
      startBalance: null
    };
  }

  componentDidMount = () => {
    const {
      onGetGoals,
      onGetQuestionnaires,
      onGetNodes,
      onGetNodeRelationships,
      onGetAllocations,
      onGetAccountTypes,
      onGetUser,
      onClearAccountPortfolioHoldins
    } = this.props;

    const username = localStorage.getItem("username");

    onGetUser({ username: username });
    onGetGoals();
    onGetQuestionnaires();
    onGetNodes();
    onGetNodeRelationships();
    onGetAllocations();
    onGetAccountTypes();
    onClearAccountPortfolioHoldins();
  };

  handleShowAccountName = name => {
    this.setState({ accountName: name });
  };

  handleInputChange = (event, maskedvalue, floatvalue) => {
    if (event.target.name === "start_balance")
      this.setState({ startBalance: floatvalue });

      if (event.target.name === "monthly_deposit")
      this.setState({ monthlyDeposit: floatvalue });
  }


  createAccount = () => {
    const { customGoal, selectedGoal, allocation, accountNumber, startBalance, monthlyDeposit } = this.state;
    const { onCreateAccount, user, accountTypes, onGetClientAssetSize } = this.props;
    this.setState({ buyStocksAmount: startBalance });

    const payload = {
      accountNumber: accountNumber,
      monthlyDeposit: monthlyDeposit,
      startBalance: startBalance,
      allocationId: allocation.id,
      accountTypeId: accountTypes[0].id,
      goalId: selectedGoal.id,
      isDecomulation: selectedGoal.is_decumulation,
      decumulationHorizon: customGoal.decumulation_horizon,
      accumulationHorizon: customGoal.accumulation_horizon,
      goalAmount: customGoal.goal_amount,
      clientId: user.id,
      accountName: `${selectedGoal.name} ${allocation.name} (${accountNumber})`
    };
    onCreateAccount(payload);
    this.setState({ loading: true });
    onGetClientAssetSize(user.id);
    // setTimeout(() => {
    //   this.buyShares();
    // }, 3000)
  };

  customizeGoal = (event, maskedvalue, floatvalue) => {
    const { selectedGoal, customGoal } = this.state;
    if (event.target.name === "goal_amount")
      customGoal.goal_amount = floatvalue;
    if (event.target.name === "horizon" && selectedGoal.is_decumulation)
      customGoal.decumulation_horizon = parseFloat(event.target.value);
    if (event.target.name === "horizon" && !selectedGoal.is_decumulation)
      customGoal.accumulation_horizon = parseFloat(event.target.value);

    if ( customGoal.goal_amount && (customGoal.decumulation_horizon || customGoal.accumulation_horizon) ) {
      this.setState({ isNextDisabled: false });
    } else {
      this.setState({ isNextDisabled: true });
    }
    this.setState({ customGoal });
  };

  showQuestion = (answerId, jumpToStep) => {
    const { questionnaire, nodes, nodeRelationships, allocations } = this.props;

    const nextNodeRelationships = nodeRelationships.find( nr => nr.answer_id === answerId );
    if (nextNodeRelationships.is_leaf) {
      const allocation = allocations.find(a => {
        const allocationFound = a.node_map.find(nm => nm.node_id === nextNodeRelationships.node_parent_id);
        if (allocationFound) {
          return true;
        } else {
          return false;
        }
      });
      if (allocation && allocation.id) {
        this.findFirstQuestion(nodes, questionnaire);
        this.setState({ allocation, accountNumber: `${Math.floor( 100000 + Math.random() * 900000 )}${Math.floor(100000 + Math.random() * 900000)}` });
        jumpToStep(3);
      }
    } else {
      const nextNode = nodes.find( n => n.id === nextNodeRelationships.node_child_id);
      const nextQuestion = questionnaire.questions.find( q => q.id === nextNode.question_id);
      this.setState({ currentQuestion: nextQuestion });
    }
  };

  handleGoalSelect = goal => {
    this.setState({ selectedGoal: goal });
    this.setState({ isNextDisabled: false });
  };

  findFirstQuestion = () => {
    const { questionnaire, nodes } = this.props;
    const { customGoal, selectedGoal } = this.state;
    const firstNode = nodes.find(n => n.is_first);
    const firstQuestion = questionnaire.questions.find( q => q.id === firstNode.question_id );

    let answer = {};
    if (selectedGoal.is_decumulation) {
      if (customGoal.decumulation_horizon < 10) answer = firstQuestion.answers.find(a => a.value === "&lt;10 years");
      if ( customGoal.decumulation_horizon >= 10 && customGoal.decumulation_horizon <= 20 ) answer = firstQuestion.answers.find(a => a.value === "10-20 years");
      if (customGoal.decumulation_horizon > 20)answer = firstQuestion.answers.find(a => a.value === "&gt;20 years");
    } else {
      if (customGoal.accumulation_horizon < 10)answer = firstQuestion.answers.find(a => a.value === "&lt;10 years");
      if ( customGoal.accumulation_horizon >= 10 && customGoal.accumulation_horizon <= 20 ) answer = firstQuestion.answers.find(a => a.value === "10-20 years");
      if (customGoal.accumulation_horizon > 20) answer = firstQuestion.answers.find(a => a.value === "&gt;20 years");
    }
    this.showQuestion(answer.id);
  };

  disableNext = isNextDisabled => {
    this.setState({ isNextDisabled });
  };
  
  findFirstQuestion = () => {
    const { questionnaire, nodes } = this.props;
    const { customGoal, selectedGoal } = this.state;
    const firstNode = nodes.find(n => n.is_first);
    const firstQuestion = questionnaire.questions.find( q => q.id === firstNode.question_id );

    let answer = {};
    if (selectedGoal.is_decumulation) {
      if (customGoal.decumulation_horizon < 10) answer = firstQuestion.answers.find(a => a.value === "&lt;10 years");
      if ( customGoal.decumulation_horizon >= 10 && customGoal.decumulation_horizon <= 20 ) answer = firstQuestion.answers.find(a => a.value === "10-20 years");
      if (customGoal.decumulation_horizon > 20)answer = firstQuestion.answers.find(a => a.value === "&gt;20 years");
    } else {
      if (customGoal.accumulation_horizon < 10)answer = firstQuestion.answers.find(a => a.value === "&lt;10 years");
      if ( customGoal.accumulation_horizon >= 10 && customGoal.accumulation_horizon <= 20 ) answer = firstQuestion.answers.find(a => a.value === "10-20 years");
      if (customGoal.accumulation_horizon > 20) answer = firstQuestion.answers.find(a => a.value === "&gt;20 years");
    }
    this.showQuestion(answer.id);
  };

  disableNext = isNextDisabled => {
    this.setState({ isNextDisabled });
  };

  buyShares = () => {
    const {
      transactionCodes,
      accountPortifolio,
      account,
      onGetAccountPortifolioHoldings,
      onCreatePortfolioHolding,
      modelHoldings,
      onCreatePortifolioAssetSize,
      onCreatePortifolioTransaction,
      clientAssetSize,
      accounts
    } = this.props;

    const { buyStocksAmount, allocation } = this.state;
    const dates1 = ["2019-02-01", "2019-03-01", "2019-04-01", "2019-05-01", "2019-06-01", "2019-07-01", "2019-08-01", "2019-09-01", "2019-10-01", "2019-11-01", "2019-12-01"];
    const dates2 = ["2020-02-01", "2020-03-01", "2020-04-01", "2020-05-01", "2020-06-01", "2020-07-01", "2020-08-01", "2020-09-01", "2020-10-01", "2020-11-01", "2020-12-01"];
    const dates3 = ["2021-02-01", "2021-03-01", "2021-04-01", "2021-05-01", "2021-06-01", "2021-07-01", "2021-08-01", "2021-09-01", "2021-10-01", "2021-11-01", "2021-12-01"];
    const dates4 = ["2022-02-01", "2022-03-01", "2022-04-01", "2022-05-01", "2022-06-01", "2022-07-01", "2022-08-01", "2022-09-01", "2022-10-01", "2022-11-01", "2022-12-01"];
    let dates;
    let date;
    if (accounts.length === 1) {
      dates = dates1
      date = "2019-01-01"
    };
    if (accounts.length === 2) {
      dates = dates2
      date = "2020-01-01"
    };
    if (accounts.length === 3) {
      dates = dates3
      date = "2021-01-01"
    };
    if (accounts.length === 4){
      dates = dates4
      date = "2022-01-01"
    };
    for (const mh of modelHoldings) {
      const amount = buyStocksAmount * (mh.current_weight / 100);

      const payload = {
        amount: amount,
        shares: amount / 10,
        date: date,
        weight: mh.current_weight,
        security_id: mh.security_id,
        portfolio_id: accountPortifolio.id
      };
      onCreatePortfolioHolding(payload);

      const buyTransactionCode = transactionCodes.find(
        tc => tc.transaction_code === "BUY"
      );

      onCreatePortifolioTransaction({
        quantity: amount / 10,
        price: amount,
        portfolioId: accountPortifolio.id,
        securityId: mh.security_id,
        transactionCode: buyTransactionCode.id,
        modelId: mh.model_id
      });
    }

    onCreatePortifolioAssetSize({
      assetSize: buyStocksAmount,
      cashFlow: buyStocksAmount,
      portfolioId: accountPortifolio.id,
      date: date
    });

    let assetsGrowth = clientAssetSize.slice(-1)[0].value + buyStocksAmount;
    for (const d of dates) {
      if (allocation.name === "Aggressive Allocation")
        assetsGrowth = (assetsGrowth * (1 + 0.13 / 12) * getRandomInt(1,11));
      if (allocation.name === "Moderate-Aggressive Allocation")
        assetsGrowth = (assetsGrowth * (1 + 0.1 / 12) * getRandomInt(1,8));
      if (allocation.name === "Moderate Allocation")
        assetsGrowth = (assetsGrowth * (1 + 0.08 / 12) * getRandomInt(1,5));
      if (allocation.name === "Conservative Allocation")
        assetsGrowth = (assetsGrowth * (1 + 0.04 / 12) * getRandomInt(1,3));

      onCreatePortifolioAssetSize({
        assetSize: assetsGrowth,
        cashFlow: 0,
        portfolioId: accountPortifolio.id,
        date: d
      });
    }

    onGetAccountPortifolioHoldings(account.id);
  };

  onLogoutClick = () => {
    const { onLogoutUser } = this.props;
    Auth.signout(() => {
      this.props.history.push("/");
      onLogoutUser();
    });
  };

  onResetClick = async () => {
    this.setState({ isDeleting: true });
    const { onLogoutUser, onSetAccount } = this.props;
    const { clearAll } = Initializer;
    const accessToken = localStorage.getItem('accessToken');
    await clearAll(accessToken);
    Auth.signout(() => {
      onLogoutUser();
      this.props.history.push("/");
    });
    this.setState({ isDeleting: false });
    onSetAccount({});
  };

  render() {
    const {
      currentQuestion,
      answerChecked,
      selectedGoal,
      loading,
      isNextDisabled,
      customGoal,
      accountNumber,
      isDeleting
    } = this.state;

    const {
      goals,
      questionnaire,
      nodes,
      user,
      history,
      accountPortifolio,
      account,
      modelHoldings,
      transactionCodes,
      accountSubscription,
      portfolioAssetSize,
      accountPortifolioHoldings
    } = this.props;

    const stepzillaDefaultProps = {
      nextButtonCls: `btn btn-primary ${isNextDisabled ? "disabled" : ""}`,
      backButtonCls: "btn btn-default",
      nextButtonText: "Next →",
      backButtonText: "← Back",
      stepsNavigation: false
    };
    if (accountPortifolioHoldings.length > 0 && accountSubscription.id && portfolioAssetSize.id)
    setTimeout(() => {
      history.push("/dashboard");
    }, 2000)
    if (
      accountPortifolio &&
      accountPortifolio.id &&
      account.id &&
      accountSubscription &&
      accountSubscription.id &&
      modelHoldings.length > 0 &&
      transactionCodes &&
      transactionCodes.length > 0
    ) {
      this.buyShares();
    }

    if (
      Object.entries(currentQuestion).length === 0 &&
      currentQuestion.constructor === Object &&
      questionnaire &&
      nodes.length > 0 &&
      (customGoal.decumulation_horizon || customGoal.accumulation_horizon)
    ) {
      this.findFirstQuestion();
    }
    const mainGoals = goals.filter(g => !g.parent_goal_id);
    return (!loading && !isDeleting) ? (
      <div>
        <Navbar
          handleShowAccountName={name => this.handleShowAccountName(name)}
          onResetClick={this.onResetClick}
          user={user}
          routerHistory={history}
          onLogoutClick={this.onLogoutClick}
        />

        <div className="container d-flex flex-column mt-5">
          <div className="react-stepzilla">
            <StepZilla
              {...stepzillaDefaultProps}
              steps={[
                {
                  name: (
                    <StepTitle
                      icon="icon-goal"
                      doneIcon="icon-circle-tick"
                      title="Goal"
                      description="Select your goal"
                    />
                  ),
                  component: (
                    <SelectGoal
                      goals={mainGoals}
                      handleGoalSelect={this.handleGoalSelect}
                      selectedGoal={selectedGoal}
                    />
                  )
                },
                {
                  name: (
                    <StepTitle
                      icon="icon-money"
                      doneIcon="icon-circle-tick"
                      title="Customize Goal"
                      description="Tailor goal to your needs"
                    />
                  ),
                  component: (
                    <CustumizeGoal
                      selectedGoal={selectedGoal}
                      customizeGoal={this.customizeGoal}
                      disableNext={this.disableNext}
                      isNextDisabled={isNextDisabled}
                      customGoal={customGoal}
                    />
                  )
                },
                {
                  name: (
                    <StepTitle
                      icon="icon-write"
                      doneIcon="icon-circle-tick"
                      title="Questionnaire"
                      description="Answer few questions"
                    />
                  ),
                  component: (
                    <Questionnaire
                      showQuestion={this.showQuestion}
                      question={currentQuestion}
                      answerChecked={answerChecked}
                      isNextDisabled={isNextDisabled}
                      disableNext={this.disableNext}
                    />
                  )
                },
                {
                  name: (
                    <StepTitle
                      icon="icon-document"
                      doneIcon="icon-circle-tick"
                      title="Account"
                      description="Create your account"
                    />
                  ),
                  component: (
                    <FundAccount
                      accountNumber={accountNumber}
                      createAccount={this.createAccount}
                      handleInputChange={this.handleInputChange}
                      startBalance={this.state.startBalance}
                      monthlyDeposit={this.state.monthlyDeposit}
                    />
                  )
                }
              ]}
            />
          </div>
        </div>
      </div>
    ) : (
      <SpinnerComponent />
    );
  }
}

const mapStateToProps = state => ({
  goals: state.goals.goals,
  goal: state.goals.goal,
  username: state.user.username,
  questionnaire: state.questionnaire.questionnaires[0],
  nodes: state.questionnaire.nodes,
  allocations: state.questionnaire.allocations,
  nodeRelationships: state.questionnaire.nodeRelationships,
  accountTypes: state.accounts.accountTypes,
  user: state.user.user,
  accountSubscription: state.accounts.accountSubscription,
  accountPortifolio: state.accounts.accountPortifolio,
  transactionCodes: state.funding.transactionCodes,
  account: state.accounts.account,
  accounts: state.accounts.accounts,
  accountPortifolioHoldings: state.accounts.accountPortifolioHoldings,
  clientAssetSize: state.user.clientAssetSize,
  modelHoldings: state.models.modelHoldings,
  portfolioAssetSize: state.funding.portfolioAssetSize
});

const mapDispatchToProps = dispatch => ({
  onGetGoals: payload => dispatch(getGoals(payload)),
  onGetUser: payload => dispatch(getUser(payload)),
  onGetGoal: payload => dispatch(getGoal(payload)),
  onGetQuestionnaires: payload => dispatch(getQuestionnaires(payload)),
  onGetNodes: payload => dispatch(getNodes(payload)),
  onGetNodeRelationships: payload => dispatch(getNodeRelationships(payload)),
  onGetAllocations: payload => dispatch(getAllocations(payload)),
  onGetAccountTypes: payload => dispatch(getAccountTypes(payload)),
  onCreateFunding: payload => dispatch(createFunding(payload)),
  onCreatePortfolioHolding: payload => dispatch(createPortfolioHoldingg(payload)),
  onCreatePortifolioAssetSize: payload => dispatch(createPortifolioAssetSize(payload)),
  onCreatePortifolioTransaction: payload => dispatch(createPortifolioTransaction(payload)),
  onCreateAccount: payload => dispatch(createAccountt(payload)),
  onLogoutUser: payload => dispatch(logoutUser(payload)),
  onGetAccountPortifolioHoldings: payload => dispatch(getAccountPortifolioHoldings(payload)),
  onClearSubscription: payload => dispatch(subscribeAccountClear(payload)),
  onGetClientAssetSize: payload => dispatch(getClientAssetSize(payload)),
  onClearAccountPortfolioHoldins: payload => dispatch(accountPortfolioHoldingClear(payload)),
  onSetAccount: payload => dispatch(setAccount(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAccount);
