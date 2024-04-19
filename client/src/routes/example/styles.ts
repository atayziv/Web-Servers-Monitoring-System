import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        button: {
            width: "100%",
            margin: theme.spacing(1),
        },
        paper: {
            padding: theme.spacing(4),
            color: theme.palette.text.secondary,
            fontFamily: "courier",
            minWidth: "35vw",
            maxWidth: "35vw",
        },
    });
});
