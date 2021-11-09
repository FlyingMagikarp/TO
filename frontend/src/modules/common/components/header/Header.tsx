import React, {useContext} from 'react';
import {Grid, Theme} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {StoreContext} from "../../../../index";
import {observer} from "mobx-react-lite";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {AppBar, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";


export const useStyles = makeStyles((theme: Theme) => createStyles({
    navItemLink: {
        color: 'white',
        textDecoration: 'none',
    }
}));

const Header = observer(() => {
    const {uiStore} = useContext(StoreContext);
    const classes = useStyles();

    return (
        <>
            <AppBar position="static">
                <Toolbar variant="regular">
                    <Grid container spacing={2}>
                        <Grid item>
                            <Typography variant="h6" color="inherit" component="div">
                                <Link to="/" className={classes.navItemLink}>Leagues</Link>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" color="inherit" component="div">
                                <Link to="/tournaments" className={classes.navItemLink}>Tournaments</Link>
                            </Typography>
                    </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    );
});

export default Header;




