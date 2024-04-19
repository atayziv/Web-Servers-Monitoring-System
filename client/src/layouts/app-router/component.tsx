import Box from "@material-ui/core/Box";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Snackbar } from "../../contexts/snackbar/component";
import { AppTitle } from "../../layouts/app-title/component";
import { AppContent } from "../../routes/app-content/component";
import { Example } from "../../routes/example/component";
import { NotFound } from "../../routes/not-found/component";

export const AppRouter = (): React.ReactElement => {
    return (
        <BrowserRouter>
            <Snackbar>
                <AppTitle />
                <Box p={2}>
                    <Routes>
                        <Route path="/" element={<AppContent />} />
                        <Route path="/example" element={<Example />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Box>
            </Snackbar>
        </BrowserRouter>
    );
};
