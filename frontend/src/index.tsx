import React from "react";
import ReactDOM from 'react-dom';
import Main from './modules/Main'
import {UserStore} from "./modules/common/stores/userStore";
import MasterDataStore from "./modules/common/stores/masterDataStore";
import RootStore from "./rootStore";
import uiStore from "./modules/common/stores/uiStore";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import TournamentOverviewScreen from "./modules/tournaments/TournamentOverviewScreen";
import LeagueOverviewScreen from "./modules/leagues/components/LeagueOverviewScreen";
import EditLeagueScreen from "./modules/leagues/components/EditLeagueScreen";

const rootStore = RootStore.getInstance();
const stores = {
    [MasterDataStore.storeName]: rootStore.masterDataStore,
    [UserStore.storeName]: rootStore.userStore,
    [uiStore.storeName]: rootStore.uiStore,
};

export const StoreContext = React.createContext<RootStore>(rootStore);

function startApplication() {

    ReactDOM.render(
        <>
            <BrowserRouter>
                <Main/>
                <Routes>
                    <Route path="/" element={<LeagueOverviewScreen/>} />
                    <Route path="/tournaments" element={<TournamentOverviewScreen/>} />
                    <Route path="/league/add" element={<EditLeagueScreen mode={"add"}/>} />
                    <Route path="/league/edit/:id" element={<EditLeagueScreen mode={"edit"}/>} />
                </Routes>
            </BrowserRouter>
        </>,
        document.getElementById('rootApp')
    );
}

startApplication();