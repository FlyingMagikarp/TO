import React, {useContext, useEffect, useState} from 'react';
import {Grid} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {StoreContext} from "../../../index";
import {observer} from "mobx-react-lite";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Tournament from "../stores/models/tournament";
import {Typography} from "@mui/material";
import {Link} from "react-router-dom";
import AddDataCard from "../../common/components/shared/AddDataCard";
import DisplayCard from "../../common/components/shared/DisplayCard";


export const useStyles = makeStyles(() => createStyles({
    navItemLink: {
        textDecoration: 'none',
    }
}));

/**
 * Tournament overview component
 * Displays all tournaments and has an option to create new ones.
 * Both cards link to the edit screen
 * Add card with mode 'add'
 * All other card with mode 'edit'
 */
const TournamentOverviewScreen = observer(() => {
    const {tournamentStore} = useContext(StoreContext);
    const classes = useStyles();

    const [tournaments, setTournaments] = useState([] as Tournament[]);

    /**
     * Loads all tournaments for display
     */
    useEffect(() => {
        tournamentStore.getAllTournaments().then(data => {
            setTournaments(data);
        });
    }, [tournamentStore]);

    return (
        <>
            <Typography variant="h2" color="inherit" component="div">
                Tournament Overview
            </Typography>
            <div>
                <Grid container spacing={2}>
                    <Grid item>
                        <Link to="/tournament/add" className={classes.navItemLink}>
                            <AddDataCard component={"Tournament"}/>
                        </Link>
                    </Grid>

                    {tournaments.map(function(tournament, i){
                        let linkUrl = "/tournament/edit/"+tournament.tournamentId;
                        return(
                            <Grid item key={i}>
                                <Link to={linkUrl} className={classes.navItemLink}>
                                    <DisplayCard name={tournament.name} sport={tournament.format} location={tournament.location}/>
                                </Link>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        </>
    );
});

export default TournamentOverviewScreen;




