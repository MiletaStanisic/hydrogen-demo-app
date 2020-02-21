import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="erorr-container text-secondary">
          <h1>
            Something went wrong. :(
      </h1>
          <h2>
            Please reload the page.
        </h2>
        </div>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;