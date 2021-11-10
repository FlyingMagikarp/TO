import {computed, observable} from "mobx";
import RootStore from "../../../rootStore";

export interface IWorkExperience {
    startDate: number;
    endDate: number | string;
    name: string;
    place: string;
    workDone: string;
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

    public saveNewLeague(name:string, sport:string, location:string){
        return "Hello World!";
    }

}
