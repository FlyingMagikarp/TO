import {observable} from "mobx";
import RootStore from "../../../rootStore";

export class UserStore {
    public rootStore: RootStore;

    public static storeName: string = 'userStore';

    @observable public pendingRequestsCount = 0;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

}
