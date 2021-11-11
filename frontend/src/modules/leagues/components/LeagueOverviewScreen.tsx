import React, {useContext, useEffect, useState} from 'react';
import {Grid, Theme} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {StoreContext} from "../../../index";
import {observer} from "mobx-react-lite";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Link} from "react-router-dom";
import {Typography} from "@mui/material";
import DisplayCard from "../../common/components/shared/DisplayCard";
import AddDataCard from "../../common/components/shared/AddDataCard";
import League from "../stores/models/league";


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
    const {masterDataStore, uiStore, leagueStore} = useContext(StoreContext);
    const classes = useStyles();
    const isMobile = uiStore.isMediumScreenDown;

    const [leagues, setLeagues] = useState([] as League[]);

    useEffect(() => {
        leagueStore.getAllLeagues().then(data => {
            setLeagues(data);
        });
    }, [leagueStore]);


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

                    {leagues.map(function(league){
                        let linkUrl = "/league/edit/"+league.league_id;
                        return(
                            <Grid item>
                                <Link to={linkUrl} className={classes.navItemLink}>
                                    <DisplayCard name={league.name} sport={league.sport} location={league.location}/>
                                </Link>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        </>
    );
});

export default LeagueOverviewScreen;




