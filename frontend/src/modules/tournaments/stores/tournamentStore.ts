import {action, observable} from "mobx";
import RootStore from "../../../rootStore";
import Tournament from "./models/tournament";
import TournamentService from "../services/tournamentService";
import Game from "./models/game";
import {IPlayerRankingTournament} from "../../common/apiTypings";

/**
 * Handles all logic for tournaments
 */
export default class TournamentStore {
    public static storeName: string = 'tournamentStore';

    public rootStore: RootStore;

    @observable public pendingRequestsCount = 0;
    @observable public tournaments: Tournament[] = [];
    @observable public currentTournament: Tournament = new Tournament();
    @observable public roundRobinMatches: Game[] = [];
    @observable public roundRobinRanking: IPlayerRankingTournament[] = [];
    @observable public singleElimMatches: Game[] = [];
    @observable public singleElimRanking: IPlayerRankingTournament[] = [];

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    /**
     * Returns all tournaments
     */
    @action
    public async getAllTournaments(){
        this.pendingRequestsCount++;
        await TournamentService.getAllTournaments().then((result) => {
            this.tournaments = result;
            this.pendingRequestsCount--;
        });
        return this.tournaments;
    }

    /**
     * Takes a tournamentId and returns the tournament data
     * @param tournamentId
     */
    @action
    public async getTournamentById(tournamentId:number){
        this.pendingRequestsCount++;
        await TournamentService.getTournamentById(tournamentId).then((result) => {
            this.currentTournament = result;
            this.pendingRequestsCount--;
        });
        return this.currentTournament;
    }

    /**
     * Takes tournament data, creates a tournament object and calls the service function to update it
     * @param name
     * @param location
     * @param starttime
     * @param playerIds
     * @param leagueId
     * @param archived
     * @param selectedDate
     * @param tournamentId
     */
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

    /**
     * Takes tournament data, create a tournament object and calls the service function to persist it
     * @param name
     * @param location
     * @param starttime
     * @param playerIds
     * @param leagueId
     * @param archived
     * @param format
     * @param selectedDate
     */
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

    /**
     * Takes a tournamentId and calls the service function to get all round robin games
     * @param tournamentId
     */
    @action
    public async getRoundRobinGames(tournamentId:number){
        this.pendingRequestsCount++;
        await TournamentService.getRoundRobinGames(tournamentId).then((result) => {
            this.roundRobinMatches = result;
            this.pendingRequestsCount--;
        });
        return this.roundRobinMatches;
    }

    /**
     * Takes a list of game objects and calls the service function to update them
     * @param games
     */
    @action
    public async saveRoundRobinScore(games:Game[]){
        this.pendingRequestsCount++;
        await TournamentService.saveRoundRobinScore(games).then(() => {this.pendingRequestsCount--;});
    }

    /**
     * Takes a tournamentId and calls the service function to get the tournament ranking
     * @param tournamentId
     */
    @action
    public async getRoundRobinPlayerRanking(tournamentId:number){
        this.pendingRequestsCount++;
        await TournamentService.getRoundRobinPlayerRanking(tournamentId).then((result) => {
            this.roundRobinRanking = result;
            this.pendingRequestsCount--;
        });
        return this.roundRobinRanking;
    }

    /**
     * Takes a tournamentId and calls the service function to get the single elimination games
     * @param tournamentId
     */
    @action
    public async getSingleEliminationGames(tournamentId:number){
        this.pendingRequestsCount++;
        await TournamentService.getSingleEliminationGames(tournamentId).then((result) => {
            this.singleElimMatches = result;
            this.pendingRequestsCount--;
        });
        return this.singleElimMatches;
    }

    /**
     * Takes a list of game objects and calls the service function to update them
     * @param games
     */
    @action
    public async saveSingleEliminationScore(games:Game[]){
        this.pendingRequestsCount++;
        await TournamentService.saveSingleEliminationScore(games).then(() => {this.pendingRequestsCount--;});
    }

    /**
     * Takes a tournamentId and calls the service function to get the tournament ranking
     * @param tournamentId
     */
    @action
    public async getSingleElimPlayerRanking(tournamentId:number){
        this.pendingRequestsCount++;
        await TournamentService.getRoundRobinPlayerRanking(tournamentId).then((result) => {
            this.roundRobinRanking = result;
            this.pendingRequestsCount--;
        });
        return this.roundRobinRanking;
    }
}