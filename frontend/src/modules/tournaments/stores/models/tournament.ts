import {ITournamentData} from "../../../common/apiTypings";
import {action, observable} from "mobx";

export default class Tournament {
    public static createFromTournamentDto(dto: ITournamentData): Tournament{
        const t = new Tournament();
        t.tournamentId = dto.tournamentId;
        t.name = dto.name;
        t.location = dto.location;
        t.date = dto.date;
        t.starttime = dto.starttime;
        t.format = dto.format;
        t.players = dto.players;
        t.rankedPlayer = dto.rankedPlayer;
        t.leagueId = dto.leagueId;
        t.archived = dto.archived;

        return t;
    }

    @observable public tournamentId: number | undefined;
    @observable public name: string | undefined;
    @observable public location: string | undefined;
    @observable public date: Date | undefined | null;
    @observable public starttime: string | undefined;
    @observable public format: string | undefined;
    @observable public players: string[] | undefined;
    @observable public rankedPlayer: string[] | undefined;
    @observable public leagueId: number | undefined;
    @observable public archived: boolean | undefined;

    @action
    public update(dto: ITournamentData){
        this.tournamentId = dto.tournamentId;
        this.name = dto.name;
        this.location = dto.location;
        this.date = dto.date;
        this.starttime = dto.starttime;
        this.format = dto.format;
        this.players = dto.players;
        this.rankedPlayer = dto.rankedPlayer;
        this.leagueId = dto.leagueId;
        this.archived = dto.archived;
    }
}