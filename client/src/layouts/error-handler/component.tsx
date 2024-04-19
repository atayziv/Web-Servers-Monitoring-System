import React from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { Logger } from "../../services/logger";

interface ErrorHandlerProps {
    children: React.ReactNode;
}

export const ErrorHandler = (props: ErrorHandlerProps): React.ReactElement => {
    const errorHandler = (error: Error, info: { componentStack: string }): void => {
        Logger.error(
            error.message,
            `Error Stack: ${error.stack} | Component Stack: ${info.componentStack}`,
        );
    };

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
            {props.children}
        </ErrorBoundary>
    );
};

const ErrorFallback = (fallbackProps: FallbackProps): React.ReactElement => {
    return (
        // It's important not to use special designs here, for the fallback to work, even when MUI fails
        <div role="alert">
            <p>Something went wrong:</p>
            <pre>{fallbackProps.error.message}</pre>
            <button onClick={fallbackProps.resetErrorBoundary}>Try again</button>
        </div>
    );
};
