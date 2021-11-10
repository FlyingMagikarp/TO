import {ILeagueData} from "../../../common/apiTypings";
import {action, observable} from "mobx";


export default class League {
    public static createFromLeagueDto(dto: ILeagueData): League{
        const league = new League();
        league.league_id = dto.league_id;
        league.name = dto.name;
        league.sport = dto.sport;
        league.location = dto.location;
        league.archived = dto.archived;

        return league;
    }

    @observable public league_id: number | undefined;
    @observable public name: string | undefined;
    @observable public sport: string | undefined;
    @observable public location: string | undefined;
    @observable public archived: boolean | undefined;


    @action
    public update(dto: ILeagueData){
        this.league_id = dto.league_id;
        this.name = dto.name;
        this.sport = dto.sport;
        this.location = dto.location;
        this.archived = dto.archived;
    }
}