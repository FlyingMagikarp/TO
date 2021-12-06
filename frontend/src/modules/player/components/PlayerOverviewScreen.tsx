import React, {useContext, useEffect, useState} from 'react';
import {Grid, Theme} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {StoreContext} from "../../../index";
import {observer} from "mobx-react-lite";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Typography} from "@mui/material";
import {Link} from "react-router-dom";
import AddDataCard from "../../common/components/shared/AddDataCard";
import DisplayCard from "../../common/components/shared/DisplayCard";
import {IPlayerSelected} from "../../common/apiTypings";


export const useStyles = makeStyles(() => createStyles({
    navItemLink: {
        textDecoration: 'none',
    }
}));


const PlayerOverviewScreen = observer(() => {
    const {playerStore} = useContext(StoreContext);
    const classes = useStyles();

    const [players, setPlayers] = useState([] as IPlayerSelected[]);

    useEffect(() => {
        playerStore.getAllPlayers().then(data => {
            setPlayers(data);
        });
    }, [playerStore]);

    return (
        <>
            <Typography variant="h2" color="inherit" component="div">
                Player Overview
            </Typography>
            <div>
                <Grid container spacing={2}>
                    <Grid item>
                        <Link to="/player/add" className={classes.navItemLink}>
                            <AddDataCard component={"Player"}/>
                        </Link>
                    </Grid>

                    {players.map(function(player){
                        let linkUrl = "/player/edit/"+player.player.guid;
                        return(
                            <Grid item>
                                <Link to={linkUrl} className={classes.navItemLink}>
                                    <DisplayCard name={player.player.tag} sport="" location=""/>
                                </Link>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        </>
    );
});

export default PlayerOverviewScreen;