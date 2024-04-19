import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";

const muiTheme = createTheme({
    palette: {
        type: "dark",
    },
});

export const theme = responsiveFontSizes(muiTheme);
