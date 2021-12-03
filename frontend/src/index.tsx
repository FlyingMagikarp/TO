import React from "react";
import ReactDOM from 'react-dom';
import Main from './modules/Main'
import RootStore from "./rootStore";
import uiStore from "./modules/common/stores/uiStore";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import TournamentOverviewScreen from "./modules/tournaments/components/TournamentOverviewScreen";
import LeagueOverviewScreen from "./modules/leagues/components/LeagueOverviewScreen";
import EditLeagueScreen from "./modules/leagues/components/EditLeagueScreen";
import EditTournamentScreen from "./modules/tournaments/components/EditTournamentScreen";
import PlayerOverviewScreen from "./modules/player/components/PlayerOverviewScreen";
import EditPlayerScreen from "./modules/player/components/EditPlayerScreen";
import RoundRobinScreen from "./modules/tournaments/components/RoundRobinScreen";
import leagueStore from "./modules/leagues/stores/leagueStore";
import tournamentStore from "./modules/tournaments/stores/tournamentStore";
import playerStore from "./modules/player/stores/playerStore";

const rootStore = RootStore.getInstance();
const stores = {
    [uiStore.storeName]: rootStore.uiStore,
    [leagueStore.storeName]: rootStore.leagueStore,
    [tournamentStore.storeName]: rootStore.tournamentStore,
    [playerStore.storeName]: rootStore.playerStore
};

export const StoreContext = React.createContext<RootStore>(rootStore);

function startApplication() {

    ReactDOM.render(
        <>
            <BrowserRouter>
                <Main/>
                <Routes>
                    <Route path="/" element={<LeagueOverviewScreen/>} />
                    <Route path="/tournament" element={<TournamentOverviewScreen/>} />
                    <Route path="/tournament/add" element={<EditTournamentScreen mode={"add"}/>} />
                    <Route path="/tournament/edit/:id" element={<EditTournamentScreen mode={"edit"}/>} />
                    <Route path="/league/add" element={<EditLeagueScreen mode={"add"}/>} />
                    <Route path="/league/edit/:id" element={<EditLeagueScreen mode={"edit"}/>} />
                    <Route path="/player" element={<PlayerOverviewScreen/>} />
                    <Route path="/player/add" element={<EditPlayerScreen mode={"add"}/>} />
                    <Route path="/player/edit/:id" element={<EditPlayerScreen mode={"edit"}/>} />

                    <Route path="/tournament/roundRobin/:id" element={<RoundRobinScreen/>} />
                </Routes>
            </BrowserRouter>
        </>,
        document.getElementById('rootApp')
    );
}

startApplication();