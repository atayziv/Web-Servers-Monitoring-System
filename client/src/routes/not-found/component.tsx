import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import React from "react";

export const NotFound = (): React.ReactElement => {
    return (
        <Box textAlign="center" p={5}>
            <Typography variant="h3">Error 404</Typography>
            <Typography variant="h4">Page not found</Typography>
        </Box>
    );
};
