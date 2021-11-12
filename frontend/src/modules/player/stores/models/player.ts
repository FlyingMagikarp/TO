import {action, observable} from "mobx";
import {IPlayerData} from "../../../common/apiTypings";


export default class Player {
    public static createFromPlayerDto(dto: IPlayerData): Player{
        const p = new Player();
        p.guid = dto.guid;
        p.tag = dto.tag;
        p.archived = dto.archived;

        return p;
    }

    @observable public guid: string | undefined;
    @observable public tag: string | undefined;
    @observable public archived: boolean | undefined;

    @action
    public update(dto: IPlayerData){
        this.guid = dto.guid;
        this.tag = dto.tag;
        this.archived = dto.archived;
    }
}