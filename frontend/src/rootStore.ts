import { configure } from 'mobx';
import leagueStore from "./modules/leagues/stores/leagueStore";
import tournamentStore from "./modules/tournaments/stores/tournamentStore";
import playerStore from "./modules/player/stores/playerStore";

configure({ enforceActions: 'observed' });

/**
 * Contains and initializes all stores
 */
export default class RootStore {

    public static storeName: string = 'rootStore';

    public static getInstance() {
        if (!RootStore.instance) {
            RootStore.instance = new RootStore();
        }
        return RootStore.instance;
    }

    private static instance: RootStore;

    public leagueStore: leagueStore;
    public tournamentStore: tournamentStore;
    public playerStore: playerStore;

    private constructor() {
        this.leagueStore = new leagueStore(this);
        this.tournamentStore = new tournamentStore(this);
        this.playerStore = new playerStore(this);
    }

}