import { UPDATE_INIT_STATE } from "../actions/actionTypes";


const initialState = {
  securities: [
    {
      name: 'Vanguard Total Stock Market ETF',
      security_class: 'ETF',
      ticker: 'VTI',
      asset_class: 'US Equities',
      is_active: true,
    },
    {
      name: 'Vanguard Total Bond Market ETF',
      ticker: 'BND',
      security_class: 'ETF',
      asset_class: 'US Fixed Income',
      is_active: true,
    }
  ],
  transaction_codes: [
    {
      category: "Security Purchases",
      is_buy: true,
      transaction_code: "BUY",
      transaction_code_description: "Buy Security"
    },
    {
      category: "Security Sales",
      is_buy: false,
      transaction_code: "SELL",
      transaction_code_description: "Sell Security"
    },
  ],
  accountTypes: [
    {
      name: 'Taxable',
      code: '103',
      is_taxable: true,
      short_name: 'TXB'
    },
    {
      name: 'Non-taxable',
      code: '104',
      is_taxable: false,
      short_name: 'NTXB'
    },
  ],
  allocations: [
    {
      name: 'Conservative Allocation',
      description: 'Allocation for an investor with a conservative risk profile.',
      volatility: 0.03,
      performance: 0.04,
      is_active: true,
      models: [
        {
          name: 'Conservative',
          description: 'Investment model for an investor with a conservative risk profile.',
          current_weight: 100,
          strategic_weight: 100,
          date: '2020-02-13T17:55:07.069Z',
          holdings: [
            {
              current_weight: 20,
              strategic_weight: 20,
              date: "2019-01-01",
              security_ticker: 'VTI'
            },
            {
              current_weight: 80,
              strategic_weight: 80,
              date: "2019-01-01",
              security_ticker: 'BND'
            }
          ]
        }
      ]
    },
    {
      name: 'Moderate Allocation',
      description: 'Investment allocation for an investor with a moderate risk profile.',
      is_active: true,
      volatility: 0.05,
      performance: 0.08,
      models: [
        {
          name: 'Moderate',
          description: 'Investment model for an investor with a moderate risk profile.',
          current_weight: 100,
          strategic_weight: 100,
          date: '2020-02-13T17:55:07.069Z',
          holdings: [
            {
              current_weight: 40,
              strategic_weight: 40,
              date: "2019-01-01",
              security_ticker: 'VTI'
            },
            {
              current_weight: 60,
              strategic_weight: 60,
              date: "2019-01-01",
              security_ticker: 'BND'
            }
          ]
        }
      ]
    },
    {
      name: 'Moderate-Aggressive Allocation',
      description: 'Investment allocation for an investor with a moderate-aggressive risk profile.',
      is_active: true,
      volatility: 0.08,
      performance: 0.1,
      models: [
        {
          name: 'Moderate-Aggressive',
          description: 'Investment model for an investor with a moderate risk profile.',
          current_weight: 100,
          strategic_weight: 100,
          date: '2020-02-13T17:55:07.069Z',
          holdings: [
            {
              current_weight: 60,
              strategic_weight: 60,
              date: "2019-01-01",
              security_ticker: 'VTI'
            },
            {
              current_weight: 40,
              strategic_weight: 40,
              date: "2019-01-01",
              security_ticker: 'BND'
            }
          ]
        }
      ]
    },
    {
      name: 'Aggressive Allocation',
      description: 'Investment model for an investor with a aggressive risk profile.',
      is_active: true,
      volatility: 0.11,
      performance: 0.13,
      models: [
        {
          name: 'Aggressive',
          description: 'Investment model for an investor with a moderate risk profile.',
          current_weight: 100,
          strategic_weight: 100,
          date: '2020-02-13T17:55:07.069Z',
          holdings: [
            {
              current_weight: 80,
              strategic_weight: 80,
              date: "2019-01-01",
              security_ticker: 'VTI'
            },
            {
              current_weight: 20,
              strategic_weight: 20,
              date: "2019-01-01",
              security_ticker: 'BND'
            }
          ]
        }
      ]
    },
  ],
  goals: [
    {
      name: 'Retirement',
      image: 'icon-retirement',
      is_decumulation: true,
      questionnaire_name: 'Investment Profile Questionnaire',
      allocations: [
        {
          allocationName: 'Conservative Allocation',
        }
      ]
    },
    {
      name: 'Education',
      image: 'icon-education',
      is_decumulation: true,
      questionnaire_name: 'Investment Profile Questionnaire',
      allocations: [
        {
          allocationName: 'Conservative Allocation',
        }
      ]
    },
    {
      name: 'Build Wealth',
      image: 'icon-goal',
      is_decumulation: false,
      questionnaire_name: 'Investment Profile Questionnaire',
      allocations: [
        {
          allocationName: 'Conservative Allocation',
        }
      ]
    },
    {
      name: 'Major Purchase',
      image: 'icon-major-purchase',
      is_decumulation: false,
      type: 'Client goal',
      children: [
        {
          name: 'Home',
          questionnaire_name: 'Investment Profile Questionnaire',
          is_decumulation: false
        },
        {
          name: 'Car',
          questionnaire_name: 'Investment Profile Questionnaire',
          is_decumulation: false
        },
        {
          name: 'Wedding',
          questionnaire_name: 'Investment Profile Questionnaire',
          is_decumulation: false
        }
      ],
      allocations: [
        {
          allocationName: 'Conservative Allocation',
        }
      ]
    }
  ],
  decision_tree: {
    name: 'Investment Profile Decision Tree',
    description: 'Decision tree which allocates investors based on their investment profile.',
    questionnaire: {
      name: "Investment Profile Questionnaire",
      description: 'Determine the investment profile for a client.',
      questions: [
        {
          category: 'Investor Profile',
          title: 'What is your age?',
          question_type: 'text',
          order_index: '1',
        },
        {
          category: "Investor Profile",
          title: "How much will you be investing?",
          question_type: "monetary",
          order_index: "2"
        },
        {
          category: 'Investor Profile',
          title: 'What is your time horizon?',
          question_type: 'radio',
          order_index: '3',
          answers: [
            {
              value: '<10 years',
              label: 'Less than 10 years'
            },
            {
              value: '10-20 years',
              label: '10-20 years'
            },
            {
              value: '>20 years',
              label: 'Greather than 20 years'
            },
          ],
        },
        {
          category: 'Risk Profile',
          title: "What is your risk profile?",
          question_type: 'radio',
          order_index: '4',
          answers: [
            {
              value: 'conservative',
              label: 'Conservative'
            },
            {
              value: 'moderate',
              label: 'Moderate'
            },
            {
              value: 'aggressive',
              label: 'Aggressive'
            },
          ],
        }
      ],
    },
    decision_paths: {
      question: "What is your time horizon?", //Node 1
      answers: [{
        answer: "<10 years", //Relation Node 1 <=> Node.1.1
        leads_to: {
          question: "What is your risk profile?", //Node 1.1 (<10yrs)
          answers: [{
            answer: "conservative", //Relation Node 1.1 <=> Node.1.1.1 (<10 years, convervastive)
            leads_to: {
              allocation: "Conservative Allocation" //Node 1.1.1 (<10 years, convervastive)
            }
          }, {
            answer: "moderate",
            leads_to: {
              allocation: "Moderate Allocation" //Node 1.1.1 (<10 years, Moderate)
            }
          },
          {
            answer: "aggressive",
            leads_to: {
              allocation: "Moderate-Aggressive Allocation"
            }
          }]
        }
      },
      {
        answer: "10-20 years",
        leads_to: {
          question: "What is your risk profile?",  //Node 1.2
          answers: [{
            answer: "conservative",
            leads_to: {
              allocation: "Conservative Allocation"
            }
          }, {
            answer: "moderate",
            leads_to: {
              allocation: "Moderate-Aggressive Allocation"
            }
          },
          {
            answer: "aggressive",
            leads_to: {
              allocation: "Aggressive Allocation"
            }
          }]
        }
      },
      {
        answer: ">20 years",
        leads_to: {
          question: "What is your risk profile?",
          answers: [{
            answer: "conservative",
            leads_to: {
              allocation: "Moderate Allocation"
            }
          }, {
            answer: "moderate",
            leads_to: {
              allocation: "Moderate-Aggressive Allocation"
            }
          },
          {
            answer: "aggressive",
            leads_to: {
              allocation: "Aggressive Allocation"
            }
          }]
        }
      }
      ]
    }
  },
  clients: [
    {
      first_name: 'John',
      last_name: 'Doe',
      email: 'hydrogen1@demo.com',
      password: '123456789',
      client_type: 'individual',
      authorities: 'ROLE_PORTFOLIO_MANAGER',
      phone_number: '123-123-2211',
      client_account_association_type: 'owner',
      accounts: [
        {
          name: "Invenstment Account",
          current_weight: 50,
          strategic_weight: 50,
          date: '2018-06-28',
          accout_type_name: 'Non-taxable',
          allocation_name: 'Moderate Allocation',
          goals: [
            {
              goal_name: "Education",
              goal_amount: 40000,
              accumulation_horizon: 5,
            }
          ],
          cash: 10000,
        }
      ]
    }
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_INIT_STATE:
      return {
        initialState: action.payload
      }
    default:
      return state;
  }
}