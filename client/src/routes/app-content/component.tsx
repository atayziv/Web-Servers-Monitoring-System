import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAsyncError } from "../../hooks/async-error";
import { Logger } from "../../services/logger";

export const AppContent = (): React.ReactElement => {
    const [count, setCount] = React.useState<number>(0);
    const throwError = useAsyncError();

    const increaseCounterByOne = (): void => {
        Logger.info("The counter button was pressed");
        setCount(count + 1);
    };

    const throwAnAsyncError = (): void => {
        throwError(new Error("some exception message"));
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h4">This is our App&apos;s UI</Typography>
            <br />
            <Button variant="contained" color="primary" onClick={increaseCounterByOne}>
                I was clicked {count} times
            </Button>
            <br />
            <Button variant="contained" color="secondary" onClick={throwAnAsyncError}>
                Throw an error
            </Button>
            <br />
            <Button variant="contained" color="default" component={RouterLink} to="/example">
                Go to example page
            </Button>
        </Box>
    );
};
