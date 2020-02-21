import React, { Component } from 'react';
import ReactJson from 'react-json-view';
import { Card } from 'react-bootstrap';

export default class JsonEditorComponent extends Component {
  componentDidMount() {
    const { handleRenderButton, isShow } = this.props;
    if (isShow) {
      handleRenderButton(false);
    }
  }
  render() {
    const { onSubmit, initState, handleInputChange } = this.props;
    

    return (
      <form onSubmit={e => onSubmit(e)}>
        <Card className="jsonCard">
          <Card.Header as="h4">JSON configuration <br />
            <span>Hydrogen environment is not initialized. Please initialize it by using json bellow.</span></Card.Header>
          <Card.Body>
            <Card.Title>Edit JSON data</Card.Title>
            <ReactJson
              src={initState}
              theme="apathy:inverted"
              collapsed={1}
              displayDataTypes={false}
              onEdit={values => handleInputChange(values)}
              iconStyle='circle'
            />
          </Card.Body>
        </Card>
      </form>
    )
  }
}
