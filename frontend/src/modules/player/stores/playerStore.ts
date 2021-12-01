import RootStore from "../../../rootStore";
import {action, observable} from "mobx";
import Player from "./models/player";
import PlayerService from "../services/playerService";
import {IPlayerSelected} from "../../common/apiTypings";


export default class PlayerStore {
    public static storeName: string = 'playerStore';

    public rootStore: RootStore;

    @observable public pendingRequestsCount = 0;
    @observable public players: Player[] = [];
    @observable public playersWithSelected: IPlayerSelected[] = [];
    @observable public currentPlayer: Player = new Player();

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action
    public async getAllPlayers(){
        this.pendingRequestsCount++;
        await PlayerService.getAllPlayers().then((result) => {
            let tmp: IPlayerSelected[] = [];
            for (let p of result) {
                let player: IPlayerSelected = {player: p, selected: false};
                tmp.push(player)
            }
            this.playersWithSelected = tmp;
            this.pendingRequestsCount--;
        });
        return this.playersWithSelected;
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