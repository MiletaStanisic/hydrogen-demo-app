import React from "react";
import { Card, Row, Col, Button, Form } from "react-bootstrap";
import CurrencyInput from 'react-currency-input';
import "../styles/steps.scss";
import "../styles/element/css/element.css";

export const SelectGoal = ({ goals, handleGoalSelect, selectedGoal }) => (
  <Row>
    <Col md={{ span: 6, offset: 3 }}>
      <Card className="main-card w-100">
        {goals.map((goal, index) => {
          return (
            <Row key={index} className="">
              <Card
                className={`goal-card w-100 ${
                  selectedGoal.id === goal.id ? "selected" : ""
                  }`}
                onClick={() => handleGoalSelect(goal)}
              >
                <span className={`goal-icon ${goal.metadata.image}`}></span>
                <span className="text-big ml-3">{goal.name}</span>
                <br />
              </Card>
            </Row>
          );
        })}
      </Card>
    </Col>
  </Row>
);

export const CustumizeGoal = ({ selectedGoal, customizeGoal, disableNext, customGoal, isNextDisabled }) => {
  if (
    !customGoal.goal_amount &&
    !(customGoal.decumulation_horizon || customGoal.accumulation_horizon) &&
    !isNextDisabled
  ) disableNext(true);
  if (
    customGoal.goal_amount &&
    (customGoal.decumulation_horizon || customGoal.accumulation_horizon) &&
    isNextDisabled
  ) disableNext(false);
  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <Card className="w-100 p-3 customize-goal-card main-card">
          <Card.Header>
            <Row>
              <span
                className={`goal-icon mx-3 ${selectedGoal.metadata.image}`}
              ></span>
              <h1 className="display-3">{selectedGoal.name}</h1>
            </Row>
          </Card.Header>
          <Card.Body>
            <Row>
              <p className="lead mr-auto">Goal Amount</p>
              <Form.Group>
                <CurrencyInput
                  name="goal_amount"
                  className="form-control"
                  precision={0}
                  thousandSeparator=','
                  decimalSeparator='.'
                  prefix="$"
                  value={customGoal.goal_amount}
                  onChangeEvent={customizeGoal}
                />
              </Form.Group>
            </Row>
            <Row>
              <p className="lead mr-auto">Period of achievement (years)</p>
              <Form.Group>
                <Form.Control
                  onChange={customizeGoal}
                  defaultValue={
                    customGoal.decumulation_horizon ||
                    customGoal.accumulation_horizon
                  }
                  type="number"
                  name="horizon"
                />
              </Form.Group>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export const Questionnaire = ({
  question,
  showQuestion,
  jumpToStep,
  answerChecked,
  isNextDisabled,
  disableNext,
}) => {
  if (!isNextDisabled) disableNext(true);
  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <Card className={`main-card`}>
          <Card.Header as="h6" className="text-center">
            <h2 className="m-3">{question.title}</h2>
          </Card.Header>
          <Card.Body className="questionnaire">
            <div className="custom-controls-stacked">
              {question &&
                question.answers &&
                question.answers.map((answer, index) => {
                  return (
                    <Form.Check
                      key={index}
                      custom
                      type="radio"
                      className="mb-4 add-account-form-check"
                      checked={answer.id === answerChecked}
                      onChange={() => showQuestion(answer.id, jumpToStep)}
                      id={index + 1}
                      label={answer.label}
                    />
                  );
                })}
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export const FundAccount = ({ createAccount, accountNumber, handleInputChange, monthlyDeposit, startBalance }) => (
  <Row>
    <Col md={{ span: 6, offset: 3 }}>
      <Card className="main-card">
        <Form>
          <Card.Body className="py-4">
            <Form.Row>
              <p className="lead ml-3 mr-auto">Account Number</p>
              <Form.Group>
                <Form.Control
                  name="accountNumber"
                  disabled
                  value={accountNumber}
                />
              </Form.Group>
            </Form.Row>
            <hr className="mt-0 mb-4" />
            <Row>
              <p className="lead ml-3 mr-auto">Starting Investment</p>
              <Form.Group>
                <CurrencyInput
                  name="start_balance"
                  className="form-control"
                  precision={0}
                  thousandSeparator=','
                  decimalSeparator='.'
                  value={startBalance}
                  prefix="$"
                  onChangeEvent={handleInputChange}

                />
              </Form.Group>
            </Row>
            <hr className="mt-0 mb-4" />
            <Row>
              <p className="lead ml-3 mr-auto">Monthly Deposit</p>
              <Form.Group>
                <CurrencyInput
                  name="monthly_deposit"
                  className="form-control"
                  precision={0}
                  thousandSeparator=','
                  decimalSeparator='.'
                  value={monthlyDeposit}
                  prefix="$"
                  onChangeEvent={handleInputChange}
                />
              </Form.Group>
            </Row>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-center">
            <Button
              variant="primary"
              type="button"
              onClick={createAccount}
              className={(monthlyDeposit < 1 || startBalance < 1) ? "disabled my-3 w-75" : "my-3 w-75"}>
              Create Account
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    </Col>
  </Row>
);
