import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import * as Chartjs from 'react-chartjs-2';
import 'react-rangeslider/lib/index.css';

import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import { formatCurrency } from './helpers'
import {
  DonutChart,
  ColorListTable,
  ColorListTableRow,
  ColorListTableCell
} from '@hydrogenapi/react-components';
import '../styles/element/css/element.css';
import '../App.css';
import "nouislider/distribute/nouislider.css";

export const Account = ({ goal, account, curInventorySlider, monthlyDepositSlider, currentAccountInventory, runGoalProjection, goalProjection, allocation, monthlyFunding, modelHoldings, securities }) => {
  const colors = ['#28A6F8', '#1856FA', '#327fa8', '#133080', '#335fd6']
  const data = (modelHoldings && modelHoldings.length > 0 && securities.length > 0) ? modelHoldings.map((mh, index) => {
    const security = securities.find(s => s.id === mh.security_id);
    let securityType;
    if (security && security.ticker === 'VTI') securityType = 'Stocks';
    if (security && security.ticker === 'BND') securityType = 'Bonds';
    return {
      value: mh.current_weight,
      label: securityType,
      asset_class: security && security.asset_class ? security.asset_class : '',
      color: colors[index],
    }
  }) : [];
  const accountGoal = account && account.id && account.goals.length > 0 ? account.goals[0] : {};
  return (
    <div>
      <Row noGutters className="row-bordered container-m-nx">
        <Card className="p-3 m-2 float-left allocation-info-card">
          <h4 className='font-weight-light card-allocation-name text-center'>{allocation.name}</h4>
          <span className='font-weight-light'>{allocation.description}</span>

          {allocation.id &&
            <span className='font-weight-light'>Risk level:
          <b> {allocation.name.substr(0, allocation.name.indexOf(' '))}</b>,
          Performance: <b>{allocation.performance}%</b>,
          Volatility: <b>{allocation.volatility}%</b>
            </span>}
          {monthlyFunding &&
            <div className='slider1-account-div'>
              <span className="slider1-title">Monthly deposit</span>
              <RangeSlider
                value={monthlyDepositSlider ? monthlyDepositSlider : monthlyFunding}
                variant="info"
                tooltip='on'
                min={100}
                max={5000}
                step={10}
                onChange={evt => runGoalProjection({ monthlyDeposit: parseInt(evt.target.value) })}
              />
            </div>
          }
          {currentAccountInventory &&
            <div className='slider2-account-div'>
              <span className="slider2-title">Current account balance</span>
              <RangeSlider
                value={curInventorySlider ? curInventorySlider : currentAccountInventory}
                variant="info"
                tooltip='on'
                step={100}
                min={100}
                max={100000}
                onChange={evt => runGoalProjection({ curInventory: parseInt(evt.target.value) })}
              />
            </div>}
          {goalProjection && goalProjection.current_status && Object.values(goalProjection.current_status.return_details).length > 0 &&
            <span className='font-weight-light mt-5'>Projected accounts balance in {accountGoal.accumulation_horizon || accountGoal.decumulation_horizon} years:
            <b> ${accountGoal.accumulation_horizon ?
                (goalProjection.current_status.final_balance && formatCurrency(goalProjection.current_status.final_balance))
                : (goalProjection.current_status.accumulation_balance && formatCurrency(goalProjection.current_status.accumulation_balance))}</b>
            </span>}
        </Card>
        <Card className="client-card-dashboard account-card-no-resize m-2 pt-4 flex-grow-1 float-right">
          <DonutChart
            width={250}
            height={300}
            data={data.map(d => { return { value: d.value / 100, color: d.color } })}
          />
          <div className="client-table-dashboard pt-4">
            <ColorListTable data={data.map(d => { return { value: d.value, label: d.label, color: d.color } })}>
              {
                data.map((d, index) => {
                  return (
                    <ColorListTableRow key={index}>
                      <ColorListTableCell>{d.asset_class}</ColorListTableCell>
                      <ColorListTableCell>{d.value.toFixed(2)}%</ColorListTableCell>
                    </ColorListTableRow>
                  )
                })
              }
            </ColorListTable>
          </div>
        </Card>

      </Row>
      <Row noGutters className="row-bordered container-m-nx">

        <Col sm={6} md={3} lg={6} xl={3}>
          <Card className="m-2 account-info-cards">
            <div className="d-flex align-items-center container-p-x py-4">
              <div className="icon-vertical-bar-chart display-4 text-primary"></div>
              <div className="ml-3">
                <div className="text-muted small">Current Account Balance</div>
                <div className="text-large">${curInventorySlider ? curInventorySlider : (currentAccountInventory ? formatCurrency(currentAccountInventory.toFixed(2)) : '0')}</div>
                {curInventorySlider && <span className="text-muted">{`Original Balance ${currentAccountInventory ? formatCurrency(currentAccountInventory.toFixed(2)) : '0'}`}</span>}
              </div>
            </div>
          </Card>
        </Col>
        <Col sm={6} md={3} lg={6} xl={3}>
          <Card className="m-2 account-info-cards">
            <div className="d-flex align-items-center container-p-x py-4">
              <div className="icon-circle-dollar display-4 text-primary"></div>
              <div className="ml-3">
                <div className="text-muted small">Reccuring Deposit</div>
                <div className="text-large">${monthlyDepositSlider ? monthlyDepositSlider : (monthlyFunding ? formatCurrency(monthlyFunding.toFixed(2)) : '0')}</div>
                {monthlyDepositSlider && <span className="text-muted">{`Original Deposit ${monthlyFunding ? formatCurrency(monthlyFunding.toFixed(2)) : '0'}`}</span>}
              </div>
            </div>
          </Card>
        </Col>
        <Col sm={6} md={3} lg={6} xl={3}>
          <Card className="m-2 account-info-cards">
            <div className="d-flex align-items-center container-p-x py-3">
              <div className="icon-goal display-4 text-primary"></div>
              <div className="ml-3">
                <div className="text-muted small">Goal Target</div>
                <div className="text-large">${accountGoal.goal_amount ? formatCurrency(accountGoal.goal_amount) : 0}</div>
                <span className="text-muted">{`in ${accountGoal.accumulation_horizon || accountGoal.decumulation_horizon} years`}</span>
              </div>
            </div>
          </Card>
        </Col>
        <Col sm={6} md={3} lg={6} xl={3}>
          <Card className="m-2 account-info-cards">
            <div className="d-flex align-items-center container-p-x py-4">
              <div className={`${goal && goal.metadata && goal.metadata.image ? goal.metadata.image : `icon-education`} display-4 text-primary`}></div>
              <div className="ml-3">
                <div className="text-muted small">{goal.name}</div>
                {goalProjection && goalProjection.current_status && <div className={`text-large ${goalProjection.current_status.on_track ? 'text-success' : 'text-danger'}`}>{goalProjection.current_status.on_track ? 'Is On Track' : 'Is Not On Track'}</div>}
              </div>
            </div>
          </Card>
        </Col>
        <Card className="p-3 m-2 w-100">
          <h5 className="text-muted font-weight-normal mb-4">Projected growth per years</h5>
          {goalProjection && goalProjection.current_status && Object.values(goalProjection.current_status.return_details).length > 0 &&
            <div className="w-100 dashboard-chart">
              <Chartjs.Line
                height={200}
                data={{
                  labels: Object.values(goalProjection.current_status.return_details).map(d => d.cumulative_earnings),
                  datasets: [{
                    label: 'Cumulative Earnings',
                    data: Object.values(goalProjection.current_status.return_details).map((d, index) => index),
                    borderWidth: 2,
                    backgroundColor: 'rgba(87, 181, 255, .85)',
                    borderColor: 'rgba(87, 181, 255, 1)',
                    pointBackgroundColor: 'rgba(0,0,0,0)',
                    pointBorderColor: 'rgba(0,0,0,0)',
                    pointRadius: Object.values(goalProjection.current_status.return_details).length
                  }]
                }}
                options={{
                  scales: {
                    xAxes: [{
                      gridLines: {
                        display: false
                      },
                      ticks: {
                        fontColor: '#aaa',
                        autoSkipPadding: 50
                      }
                    }],
                    yAxes: [{
                      gridLines: {
                        display: false
                      },
                      ticks: {
                        fontColor: '#aaa',
                        maxTicksLimit: 20
                      }
                    }]
                  },
                  legend: {
                    display: false
                  },
                  responsive: true,
                  maintainAspectRatio: false
                }}
              />
            </div>}
        </Card>
      </Row>
    </div>
  )
}
