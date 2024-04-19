import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MuiSnackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Alert, { Color } from "@material-ui/lab/Alert";
import React from "react";
import { config } from "../../config/config";
import { useStyles } from "./styles";

interface SnackbarProps {
    children: React.ReactNode;
}

export interface SnackbarCallbacks {
    goBackCallback?: () => void;
    tryAgainCallback?: () => void;
}

export interface ISnackbar {
    showSuccessMessage: (message: string) => void;
    showWarningMessage: (message: string) => void;
    showErrorMessage: (message: string, callbacks?: SnackbarCallbacks) => void;
}

export const SnackbarContext = React.createContext<ISnackbar | null>(null);

export const Snackbar = (props: SnackbarProps): React.ReactElement => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [severity, setSeverity] = React.useState<Color | undefined>(undefined);
    const [text, setText] = React.useState<string>("");
    const [autoHideDuration, setAutoHideDuration] = React.useState<number | null>(null);
    const [callbacks, setCallbacks] = React.useState<SnackbarCallbacks>();

    const classes = useStyles();

    const openSnackbar = (): void => {
        setAutoHideDuration(null);
        setOpen(true);
    };

    const closeSnackbar = (): void => {
        setOpen(false);
    };

    const handleSnackbarClose = (_event?: React.SyntheticEvent, reason?: string): void => {
        if (reason === "clickaway") {
            setAutoHideDuration(config.snackbarAutoHideDurationInMilliseconds);
        } else {
            closeSnackbar();
        }
    };

    const handleGoBack = (): void => {
        const currentCallbacks = callbacks as SnackbarCallbacks;
        const currentGoBackCallback = currentCallbacks.goBackCallback as () => void;
        currentGoBackCallback();
        closeSnackbar();
    };

    const handleTryAgain = (): void => {
        const currentCallbacks = callbacks as SnackbarCallbacks;
        const currentTryAgainCallback = currentCallbacks.tryAgainCallback as () => void;
        currentTryAgainCallback();
        closeSnackbar();
    };

    const showSuccessMessage = React.useCallback((message: string): void => {
        setSeverity("success");
        setText(message);
        openSnackbar();
    }, []);

    const showWarningMessage = React.useCallback((message: string): void => {
        setSeverity("warning");
        setText(message);
        openSnackbar();
    }, []);

    const showErrorMessage = React.useCallback(
        (message: string, snackbarCallbacks?: SnackbarCallbacks): void => {
            setSeverity("error");
            setText(message);
            setCallbacks(snackbarCallbacks);
            openSnackbar();
        },
        [],
    );

    const snackbar = React.useMemo<ISnackbar>(() => {
        return {
            showSuccessMessage,
            showWarningMessage,
            showErrorMessage,
        };
    }, [showErrorMessage, showSuccessMessage, showWarningMessage]);

    return (
        <SnackbarContext.Provider value={snackbar}>
            <MuiSnackbar
                open={open}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={
                    severity === "success"
                        ? config.snackbarAutoHideDurationInMilliseconds
                        : autoHideDuration
                }
            >
                <Alert
                    severity={severity}
                    variant="filled"
                    action={
                        <React.Fragment>
                            {callbacks?.goBackCallback && (
                                <Button
                                    className={classes.button}
                                    size="small"
                                    color="inherit"
                                    onClick={handleGoBack}
                                >
                                    Go back
                                </Button>
                            )}
                            {callbacks?.tryAgainCallback && (
                                <Button
                                    className={classes.button}
                                    size="small"
                                    color="inherit"
                                    onClick={handleTryAgain}
                                >
                                    Try again
                                </Button>
                            )}
                            <IconButton
                                aria-label="close"
                                size="small"
                                color="inherit"
                                onClick={handleSnackbarClose}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                >
                    {text}
                </Alert>
            </MuiSnackbar>
            {props.children}
        </SnackbarContext.Provider>
    );
};
