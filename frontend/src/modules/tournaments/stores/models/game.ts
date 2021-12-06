import {IGame} from "../../../common/apiTypings";
import {action, observable} from "mobx";

export default class Game {
    public static createFromTournamentDto(dto: IGame): Game{
        const m = new Game();
        m.gameId = dto.gameId;
        m.gameIdInTournament = dto.gameIdInTournament;
        m.tournamentId = dto.tournamentId;
        m.p1Id = dto.p1Id;
        m.p2Id = dto.p2Id;
        m.p1Score = dto.p1Score;
        m.p2Score = dto.p2Score;

        return m;
    }

    @observable public gameId: number | undefined;
    @observable public gameIdInTournament: number | undefined;
    @observable public tournamentId: number | undefined;
    @observable public p1Id: string | undefined;
    @observable public p2Id: string | undefined;
    @observable public p1Score: number | undefined;
    @observable public p2Score: number | undefined;


    @action
    public update(dto: IGame){
        this.gameId = dto.gameId;
        this.gameIdInTournament = dto.gameIdInTournament;
        this.tournamentId = dto.tournamentId;
        this.p1Id = dto.p1Id;
        this.p2Id = dto.p2Id;
        this.p1Score = dto.p1Score;
        this.p2Score = dto.p2Score;
    }
}