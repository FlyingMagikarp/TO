import {action, observable} from "mobx";
import RootStore from "../../../rootStore";
import LeagueService from "../services/leagueService";
import League from "./models/league";
import {IPlayerRankingTournament} from "../../common/apiTypings";

/**
 * Handles all logic for leagues
 */
export default class LeagueStore {
    public static storeName: string = 'leagueStore';

    public rootStore: RootStore;

    @observable public pendingRequestsCount = 0;
    @observable public leagues: League[] = [];
    @observable public currentLeague: League = new League();
    @observable public currentLeagueRanking: IPlayerRankingTournament[] = [];

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    /**
     * Returns all leagues
     */
    @action
    public async getAllLeagues(){
        this.pendingRequestsCount++;
        await LeagueService.getAllLeagues().then((result) => {
            this.leagues = result;
            this.pendingRequestsCount--;
        });
        return this.leagues;
    }

    /**
     * Takes a leagueId and returns the league data
     * @param leagueId
     */
    @action
    public async getLeagueById(leagueId:number){
        this.pendingRequestsCount++;
        await LeagueService.getLeagueById(leagueId).then((result) => {
           this.currentLeague = result;
           this.pendingRequestsCount--;
        });
        return this.currentLeague;
    }

    /**
     * Takes league data, creates a league object and calls the service function to update it
     * @param name
     * @param sport
     * @param location
     * @param archived
     * @param league_id
     */
    @action
    public async updateLeague(name:string, sport:string, location:string, archived:boolean, league_id?:number){
        let league = new League();
        league.league_id = league_id;
        league.name = name;
        league.sport = sport;
        league.location = location;
        league.archived = archived;

        this.pendingRequestsCount++;
        await LeagueService.updateLeague(league).then(() => {this.pendingRequestsCount--})
    }

    /**
     * Takes league data, creates a league object and calls the service function to persist it
     * @param name
     * @param sport
     * @param location
     */
    @action
    public async saveNewLeague(name:string, sport:string, location:string){
        let league = new League();
        league.name = name;
        league.sport = sport;
        league.location = location;
        league.archived = false;
        league.league_id = 0;

        this.pendingRequestsCount++;
        await LeagueService.saveNewLeague(league).then(() => {this.pendingRequestsCount--})

    }

    /**
     * Takes a leagueId, fromDate and toDate and calls the service function to get the league ranking
     * @param leagueId
     * @param fromDate
     * @param toDate
     */
    @action
    public async getLeagueRanking(leagueId:number, fromDate:Date, toDate:Date){
        this.pendingRequestsCount++;
        await LeagueService.getLeagueRanking(leagueId, fromDate.toISOString().substring(0,10), toDate.toISOString().substring(0,10)).then((result) => {
            this.currentLeagueRanking = result;
            this.pendingRequestsCount--;
        });
        return this.currentLeagueRanking;
    }

}