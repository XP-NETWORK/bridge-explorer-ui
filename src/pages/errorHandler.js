import React from "react";
import { setTelegram } from "../constants";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      setTelegram("errorHandler.js", this.state.errorInfo.componentStack);
      // Error path
      return (
        <div>
          <h2 margin-bottom="100px" vertical-align="baseline" align="center">
            XP.NETWORK IS CURRENTLY UNDER CONSTRUCTION
          </h2>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}
