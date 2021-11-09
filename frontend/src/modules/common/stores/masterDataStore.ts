import {computed, observable} from "mobx";
import RootStore from "../../../rootStore";

export interface IWorkExperience {
    startDate: number;
    endDate: number | string;
    name: string;
    place: string;
    workDone: string;
}

export interface IEducation {
    startDate: number;
    endDate: number | string;
    name: string;
    place: string;
}

export interface INode {
    id: number;
    label: string;
}

export interface IEdge {
    from: number;
    to: number;
}

export interface ISkillGraph {
    nodes: INode[];
    edges: IEdge[];
    name: string;
}

export default class MasterDataStore {

    public static storeName: string = 'masterDataStore';


    public rootStore: RootStore;


    @observable public pendingRequestsCount = 0;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }


    @computed
    public get isLoading() {
        return this.pendingRequestsCount > 0;
    }

    public test(){
        return "Hello World!";
    }

}
