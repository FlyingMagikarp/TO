import React from 'react';
import {Link} from "react-router-dom";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {observer} from "mobx-react-lite";
import LeagueOverviewScreen from "./leagues/components/LeagueOverviewScreen";
import TournamentOverviewScreen from "./tournaments/TournamentOverviewScreen";
import Header from "./common/components/header/Header";


const useStyles = makeStyles(() => createStyles({
    content: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    innerContent: {
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    }
}));


const Main = observer(() => {
    const classes = useStyles();
    return (
        <div>
            <Header/>
        </div>
        )
});

function Home() {
    return (
        <div>
            <h2>Home</h2>
        </div>
    );
}

function About() {
    return (
        <div>
            <h2>About</h2>
        </div>
    );
}


export default Main;



