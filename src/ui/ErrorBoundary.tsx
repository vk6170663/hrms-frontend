import { Component } from "react";
import type { ReactNode, ErrorInfo } from "react";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: undefined };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
        // You can log to an error tracking service here (e.g., Sentry)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <h2>Something went wrong.</h2>
                    <p>{this.state.error?.message || "An unexpected error occurred."}</p>
                    <button onClick={() => this.setState({ hasError: false, error: undefined })}>
                        Try Again
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;