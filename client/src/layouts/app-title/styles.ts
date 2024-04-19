import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        barIcon: {
            marginRight: theme.spacing(1),
        },
    });
});
