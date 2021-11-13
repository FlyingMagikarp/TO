import React from 'react';
import {Grid, Theme} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
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
                                <Link to="/tournament" className={classes.navItemLink}>Tournaments</Link>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" color="inherit" component="div">
                                <Link to="/player" className={classes.navItemLink}>Players</Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    );
});

export default Header;




