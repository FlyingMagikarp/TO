import {action, observable} from "mobx";
import RootStore from "../../../rootStore";
import Tournament from "./models/tournament";
import TournamentService from "../services/tournamentService";
import Game from "./models/game";
import {IPlayerRankingTournament} from "../../common/apiTypings";

export default class TournamentStore {
    public static storeName: string = 'tournamentStore';

    public rootStore: RootStore;

    @observable public pendingRequestsCount = 0;
    @observable public tournaments: Tournament[] = [];
    @observable public currentTournament: Tournament = new Tournament();
    @observable public roundRobinMatches: Game[] = [];
    @observable public roundRobinRanking: IPlayerRankingTournament[] = [];

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
    public async updateTournament(name:string, location:string, starttime:string, playerIds:string[], leagueId:number, archived:boolean, selectedDate:Date, tournamentId?:number ){
        let t = new Tournament();
        t.tournamentId = tournamentId;
        t.name = name;
        t.location = location;
        t.starttime = starttime;
        t.playerIds = playerIds;
        t.leagueId = leagueId;
        t.archived = archived;
        t.date = selectedDate;

        this.pendingRequestsCount++;
        await TournamentService.updateTournament(t).then(() => {this.pendingRequestsCount--})
    }

    @action
    public async saveNewTournament(name:string, location:string, starttime:string, playerIds:string[], leagueId:number, archived:boolean, format:string, selectedDate:Date){
        let t = new Tournament();
        t.name = name;
        t.location = location;
        t.starttime = starttime;
        t.playerIds = playerIds;
        t.leagueId = leagueId;
        t.archived = archived;
        t.format = format;
        t.date = selectedDate;

        this.pendingRequestsCount++;
        await TournamentService.saveNewTournament(t).then(() => {this.pendingRequestsCount--})
    }

    @action
    public async getRoundRobinGames(tournamentId:number){
        this.pendingRequestsCount++;
        await TournamentService.getRoundRobinGames(tournamentId).then((result) => {
            this.roundRobinMatches = result;
            this.pendingRequestsCount--;
        });
        return this.roundRobinMatches;
    }

    @action
    public async saveRoundRobinScore(games:Game[]){
        this.pendingRequestsCount++;
        await TournamentService.saveRoundRobinScore(games).then(() => {this.pendingRequestsCount--;});
    }

    @action
    public async getRoundRobinPlayerRanking(tournamentId:number){
        this.pendingRequestsCount++;
        await TournamentService.getRoundRobinPlayerRanking(tournamentId).then((result) => {
            this.roundRobinRanking = result;
            this.pendingRequestsCount--;
        });
        return this.roundRobinRanking;
    }
}