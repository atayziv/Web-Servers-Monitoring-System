import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        button: {
            margin: theme.spacing(0.5),
            whiteSpace: "nowrap",
        },
    });
});
