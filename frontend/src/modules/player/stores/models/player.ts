import {action, observable} from "mobx";
import {IPlayerData, ITournamentData} from "../../../common/apiTypings";
import tournament from "../../../tournaments/stores/models/tournament";


export default class Player {
    public static createFromPlayerDto(dto: IPlayerData): Player{
        const p = new Player();
        p.guid = dto.guid;
        p.tag = dto.tag;
        p.archived = dto.archived;
        p.tournaments = dto.tournaments;

        return p;
    }

    @observable public guid: string | undefined;
    @observable public tag: string | undefined;
    @observable public archived: boolean | undefined;
    @observable public  tournaments: tournament[] | undefined

    @action
    public update(dto: IPlayerData){
        this.guid = dto.guid;
        this.tag = dto.tag;
        this.archived = dto.archived;
        this.tournaments = dto.tournaments;
    }
}