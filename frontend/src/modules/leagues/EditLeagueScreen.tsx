import React, {useContext, useState} from 'react';
import {Grid, Theme} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {StoreContext} from "../../index";
import {observer} from "mobx-react-lite";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Link, useParams} from "react-router-dom";
import {Typography} from "@mui/material";
import DisplayCard from "../common/components/shared/DisplayCard";
import AddDataCard from "../common/components/shared/AddDataCard";


export const useStyles = makeStyles((theme: Theme) => createStyles({
    title: {
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    }
}));

type EditLeagueScreenProps = {
    mode: "add" | "edit",
}


const EditLeagueScreen = observer(({mode}:EditLeagueScreenProps) => {
    const {masterDataStore, uiStore} = useContext(StoreContext);
    const classes = useStyles();
    const isMobile = uiStore.isMediumScreenDown;

    let { id } = useParams();


    return (
        <>

            <Typography variant="h2" color="inherit" component="div">
                {mode === "add" ? "Add new " : "Edit "} League
            </Typography>
            <div>
                <Grid container spacing={2}>
                    <Grid item>
                        WEEEEEEEEEEE
                        <br/>

                        ID: {id}
                    </Grid>
                </Grid>
            </div>
        </>
    );
});

export default EditLeagueScreen;




