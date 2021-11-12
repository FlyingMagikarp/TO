import RootStore from "../../../rootStore";
import {action, observable} from "mobx";
import Player from "./models/player";
import PlayerService from "../services/playerService";


export default class PlayerStore {
    public static storeName: string = 'playerStore';

    public rootStore: RootStore;

    @observable public pendingRequestsCount = 0;
    @observable public players: Player[] = [];
    @observable public currentPlayer: Player = new Player();

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action
    public async getAllPlayers(){
        this.pendingRequestsCount++;
        await PlayerService.getAllPlayers().then((result) => {
            this.players = result;
            this.pendingRequestsCount--;
        });
        return this.players;
    }

    @action
    public async getPlayerById(playerId:string){
        this.pendingRequestsCount++;
        await PlayerService.getPlayerById(playerId).then((result) => {
            this.currentPlayer = result;
            this.pendingRequestsCount--;
        });
        return this.currentPlayer;
    }

    @action
    public async saveNewPlayer(tag:string){
        let p = new Player();
        p.tag = tag;

        this.pendingRequestsCount++;
        await PlayerService.saveNewPlayer(p).then(() => {this.pendingRequestsCount--});
    }

    @action
    public async updatePlayer(guid: string, tag:string, archived:boolean){
        let p = new Player();
        p.guid = guid;
        p.tag = tag;
        p.archived = archived;

        this.pendingRequestsCount++;
        await PlayerService.updatePlayer(p).then(() => {this.pendingRequestsCount--});
    }
}