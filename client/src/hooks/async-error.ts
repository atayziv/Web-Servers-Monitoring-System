import React from "react";

export const useAsyncError = (): ((e: Error) => void) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setError] = React.useState();

    return React.useCallback(
        (e) => {
            setError(() => {
                throw e;
            });
        },
        [setError],
    );
};
