import React, {useContext, useState} from 'react';
import {Theme} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {StoreContext} from "../../../index";
import {observer} from "mobx-react-lite";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Tournament from "../stores/models/tournament";


export const useStyles = makeStyles((theme: Theme) => createStyles({
    title: {
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    }
}));


const TournamentOverviewScreen = observer(() => {
    const {masterDataStore, uiStore} = useContext(StoreContext);
    const classes = useStyles();
    const isMobile = uiStore.isMediumScreenDown;

    //const [tournaments, setTournaments] = useState([] as Tournament[]);

    return (
        <>
            <div><h1>Tournament Overview Screen</h1></div>
        </>
    );
});

export default TournamentOverviewScreen;




