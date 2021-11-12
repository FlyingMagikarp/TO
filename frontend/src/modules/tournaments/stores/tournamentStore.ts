import {action, observable} from "mobx";
import RootStore from "../../../rootStore";
import Tournament from "./models/tournament";
import TournamentService from "../services/tournamentService";

export default class TournamentStore {
    public static storeName: string = 'tournamentStore';

    public rootStore: RootStore;

    @observable public pendingRequestsCount = 0;
    @observable public tournaments: Tournament[] = [];
    @observable public currentTournament: Tournament = new Tournament();

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action
    public async getAllTournaments(){
        this.pendingRequestsCount++;
        await TournamentService.getAllTournaments().then((result) => {
            this.tournaments = result;
            this.pendingRequestsCount--;
        });
        return this.tournaments;
    }

    @action
    public async getTournamentById(tournamentId:number){
        this.pendingRequestsCount++;
        await TournamentService.getTournamentById(tournamentId).then((result) => {
            this.currentTournament = result;
            this.pendingRequestsCount--;
        });
        return this.currentTournament;
    }

    @action
    public async updateTournament(name:string, location:string, date:Date, starttime:string, players:string[], leagueId:number, archived:boolean){
        let t = new Tournament();
        t.name = name;
        t.location = location;
        t.date = date;
        t.starttime = starttime;
        t.players = players;
        t.leagueId = leagueId;
        t.archived = archived;

        this.pendingRequestsCount++;
        await TournamentService.updateTournament(t).then(() => {this.pendingRequestsCount--})
    }

    @action
    public async saveNewTournament(name:string, location:string, date:Date, starttime:string, players:string[], leagueId:number, archived:boolean){
        let t = new Tournament();
        t.name = name;
        t.location = location;
        t.date = date;
        t.starttime = starttime;
        t.players = players;
        t.leagueId = leagueId;
        t.archived = archived;

        this.pendingRequestsCount++;
        await TournamentService.saveNewTournament(t).then(() => {this.pendingRequestsCount--})
    }

}