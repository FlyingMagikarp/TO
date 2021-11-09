import React, {useContext} from 'react';
import {Grid, Theme} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {StoreContext} from "../../index";
import {observer} from "mobx-react-lite";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Link} from "react-router-dom";
import {Typography} from "@mui/material";
import DisplayCard from "../common/components/shared/DisplayCard";
import AddDataCard from "../common/components/shared/AddDataCard";


export const useStyles = makeStyles((theme: Theme) => createStyles({
    title: {
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    navItemLink: {
        textDecoration: 'none',
    }
}));


const LeagueOverviewScreen = observer(() => {
    const {masterDataStore, uiStore} = useContext(StoreContext);
    const classes = useStyles();
    const isMobile = uiStore.isMediumScreenDown;

    return (
        <>

            <Typography variant="h2" color="inherit" component="div">
                League Overview
            </Typography>
            <div>
                <Grid container spacing={2}>
                    <Grid item>
                        <Link to="/league/add" className={classes.navItemLink}>
                            <AddDataCard component={"League"}/>
                        </Link>
                    </Grid>
                    <div>
                    </div>

                    <Grid item>
                        <Link to="/league/edit/1" className={classes.navItemLink}>
                            <DisplayCard name={"MCG Smash League"} game={"Super Smash Bros. Ultimate"} players={8} tournaments={4}/>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/league/edit/2" className={classes.navItemLink}>
                            <DisplayCard name={"MCG Smash League"} game={"Super Smash Bros. Ultimate"} players={8} tournaments={4}/>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/league/edit/3" className={classes.navItemLink}>
                            <DisplayCard name={"MCG Smash League"} game={"Super Smash Bros. Ultimate"} players={8} tournaments={4}/>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/league/edit/4" className={classes.navItemLink}>
                            <DisplayCard name={"MCG Smash League"} game={"Super Smash Bros. Ultimate"} players={8} tournaments={4}/>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </>
    );
});

export default LeagueOverviewScreen;




