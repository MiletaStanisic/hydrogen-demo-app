import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateState } from '../store/actions/index';
import JsonEditorComponent from '../components/JsonEditorComponent';
import RequestCheckerComponent from './RequestCheckerComponent';
import StepZilla from 'react-stepzilla';
import '../styles/element/css/element.css';


const StepTitle = ({ title, description, icon, doneIcon }) => {
  return (
    <span>
      {doneIcon ? <span className={`stepzilla-done-icon ${doneIcon}`} /> : ''}
      <span className={`stepzilla-icon ${icon}`} />
      <span className="stepzilla-title">{title}</span>
      {description ? <span className="stepzilla-desctiption">{description}</span> : ''}
    </span>
  )
}
class InitPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialData: {},
      hideNextButton: false,
      accessToken: null,
      hidePrevButton: true
    }
  }
  componentWillMount() {
    const { initState } = this.props;
    this.setState({ initialData: initState });
    const accessToken = localStorage.getItem('accessToken');
    this.setState({ accessToken });
  }

  handleInputChange = (values) => {
    this.setState({ initialData: values.updated_src });
  }

  handleRenderButton = (isShow) => {
    this.setState({ hideNextButton: isShow });
  }

  setPrevButton = (value) => {
    this.setState({ hidePrevButton: value })
  }

  render() {
    const { initState } = this.props;
    const { initialData, hideNextButton, accessToken, hidePrevButton } = this.state;
    const stepzillaDefaultProps = {
      nextButtonCls: hideNextButton ? 'd-none' : 'btn btn-primary jsonInitializeButtton',
      backButtonCls: hidePrevButton ? 'btn btn-default d-none' : 'btn btn-default',
      nextButtonText: 'Initialize →',
      stepsNavigation: false,
      backButtonText: '← Back'
    }

    return (
      <div className="container init-container">
        <div className="initPageContainer container d-flex flex-column">
          <StepZilla className="stepperInitPage" {...stepzillaDefaultProps}
            steps={[
              {
                name: <StepTitle icon="icon-settings" doneIcon="icon-circle-tick" title="Configure JSON file" description="Set up enviroment" />
                , component: <JsonEditorComponent
                  onSubmit={this.onSubmit}
                  state={this.state}
                  accessToken={accessToken}
                  initState={initState}
                  handleInputChange={this.handleInputChange}
                  handleRenderButton={this.handleRenderButton}
                  isShow={this.state.hideNextButton}
                />
              },
              {
                name: <StepTitle icon="icon-download" doneIcon="icon-circle-tick" title="Initialization from JSON file" description="Creating enviroment" />
                , component: <RequestCheckerComponent
                  initialData={initialData}
                  accessToken={accessToken}
                  handleRenderButton={this.handleRenderButton}
                  isShow={this.state.hideNextButton}
                  setPrevButton={value => this.setPrevButton(value)}
                />
              },
              {
                name: <StepTitle icon="icon-profile-group" doneIcon="icon-circle-tick" title="Go to Login page" description="Set up completed" />
                , component:
                  <div></div>
              },
            ]}
          />
        </div>
      </div>

    );
  }
}
const mapStateToProps = state => ({
  initState: state.updateState,
  accessToken: state.user.accessToken
});

export default connect(mapStateToProps, { updateState })(InitPage);