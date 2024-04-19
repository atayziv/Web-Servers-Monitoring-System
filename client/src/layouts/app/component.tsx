// Roboto fonts for Material-UI
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { AppRouter } from "../app-router/component";
import { ErrorHandler } from "../error-handler/component";
import { theme } from "./theme";

export const App = (): React.ReactElement => {
    return (
        <ErrorHandler>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container maxWidth="lg">
                    <AppRouter />
                </Container>
            </ThemeProvider>
        </ErrorHandler>
    );
};
