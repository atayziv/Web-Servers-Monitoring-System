import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { useStyles } from "./styles";

export const AppTitle = (): React.ReactElement => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const classes = useStyles();

    const isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (): void => {
        setAnchorEl(null);
    };

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            getContentAnchorEl={null}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Menu item 1</MenuItem>
            <MenuItem onClick={handleMenuClose}>Menu item 2</MenuItem>
            <MenuItem onClick={handleMenuClose}>Menu item 3</MenuItem>
        </Menu>
    );

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    aria-label="menu-button"
                    className={classes.barIcon}
                    edge="start"
                    onClick={handleMenuOpen}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h5">App Title</Typography>
            </Toolbar>
            {renderMenu}
        </AppBar>
    );
};
