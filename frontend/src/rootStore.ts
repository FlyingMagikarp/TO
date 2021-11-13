import { configure } from 'mobx';
import uiStore from "./modules/common/stores/uiStore";
import leagueStore from "./modules/leagues/stores/leagueStore";
import tournamentStore from "./modules/tournaments/stores/tournamentStore";
import playerStore from "./modules/player/stores/playerStore";

configure({ enforceActions: 'observed' });

export default class RootStore {

    public static storeName: string = 'rootStore';

    public static getInstance() {
        if (!RootStore.instance) {
            RootStore.instance = new RootStore();
        }
        return RootStore.instance;
    }

    private static instance: RootStore;

    public uiStore: uiStore;
    public leagueStore: leagueStore;
    public tournamentStore: tournamentStore;
    public playerStore: playerStore;


    private constructor() {
        this.uiStore = new uiStore(this);
        this.leagueStore = new leagueStore(this);
        this.tournamentStore = new tournamentStore(this);
        this.playerStore = new playerStore(this);
    }

}