import React, { Component } from 'react';
import { FoldingCube } from 'better-react-spinkit'

class SpinnerComponent extends Component {
  render() {
    return (
      <div className="spinner-container">
          <FoldingCube size={100} color='#26B4FF'/>
        </div>
    );
  }
}

export default SpinnerComponent;