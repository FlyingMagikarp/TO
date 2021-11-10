import {action, observable} from "mobx";
import RootStore from "../../../rootStore";
import LeagueService from "../services/leagueService";
import League from "./models/league";

export default class LeagueStore {
    public static storeName: string = 'leagueStore';

    public rootStore: RootStore;

    @observable public height: number = window.innerHeight;
    @observable public pendingRequestsCount = 0;
    @observable public leagues: League[] = [];
    @observable public currentLeagues: League = new League();

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action
    public async  getAllLeagues(){
        this.pendingRequestsCount++;
        await LeagueService.getAllLeagues().then((result) => {
            this.leagues = result;
            this.pendingRequestsCount--;
        });
        return this.leagues;
    }

    @action
    public async getLeagueById(leagueId:number){
        this.pendingRequestsCount++;
        await LeagueService.getLeagueById(leagueId).then((result) => {
           this.currentLeagues = result;
           this.pendingRequestsCount--;
        });
        return this.currentLeagues;
    }

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

}