import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { ISnackbar, SnackbarContext } from "../../contexts/snackbar/component";
import { ExampleService } from "../../services/example";
import { useStyles } from "./styles";

export const Example = (): React.ReactElement => {
    const snackbar = React.useContext(SnackbarContext) as ISnackbar;

    const [response, setResponse] = React.useState<string>(
        "No request was still made to the server",
    );
    const classes = useStyles();

    const getExample = async (): Promise<void> => {
        const serverResponse = await ExampleService.get();
        setResponse(serverResponse);
    };

    const postExample = async (): Promise<void> => {
        const serverResponse = await ExampleService.post();
        setResponse(serverResponse);
    };

    const deleteExample = async (): Promise<void> => {
        const serverResponse = await ExampleService.delete();
        setResponse(serverResponse);
    };

    const showError = (): void => {
        snackbar.showErrorMessage("Sample error message");
    };

    return (
        <Box display="flex" justifyContent="space-evenly">
            <Box display="flex" flexDirection="column" alignItems="center">
                <Button
                    className={classes.button}
                    variant="contained"
                    color="default"
                    component={RouterLink}
                    to="/"
                >
                    Go back
                </Button>
                <br />
                <Box width={1}>
                    <Divider variant="middle" />
                </Box>
                <br />
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={getExample}
                >
                    Try Get Example Route
                </Button>
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={postExample}
                >
                    Try Post Example Route
                </Button>
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={deleteExample}
                >
                    Try Delete Example Route
                </Button>
                <br />
                <Box width={1}>
                    <Divider variant="middle" />
                </Box>
                <br />
                <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={showError}
                >
                    Show Error Message
                </Button>
            </Box>
            <Paper role="region" className={classes.paper}>
                {response}
            </Paper>
        </Box>
    );
};
