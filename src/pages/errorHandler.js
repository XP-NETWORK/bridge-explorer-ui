import React from "react";

import systemError from "../assets/img/systemError.png";
import { Tools } from "../components/Tools";

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
            // Error path
            return (
                <div className="cont">
                    <div className="ErrorContainer">
                        <div className="ErrorImage">
                            <img src={systemError} />
                        </div>
                        <div className="ErrorText">
                            <h1>OUCH!</h1>
                            <p>System Error.</p>
                        </div>
                    </div>
                    <div className="ErrorToolsContainer">
                        <Tools />
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}
