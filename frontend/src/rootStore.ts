import { configure } from 'mobx';
import MasterDataStore from "./modules/common/stores/masterDataStore";
import {UserStore} from "./modules/common/stores/userStore";
import uiStore from "./modules/common/stores/uiStore";

configure({ enforceActions: 'observed' });

export default class RootStore {

    public static storeName: string = 'rootStore';

    public static getInstance() {
        if (!RootStore.instance) {
            RootStore.instance = new RootStore();
        }
        return RootStore.instance;
    }

    private static instance: RootStore;

    public masterDataStore: MasterDataStore;
    public userStore: UserStore;
    public uiStore: uiStore;


    private constructor() {
        this.masterDataStore = new MasterDataStore(this);
        this.userStore = new UserStore(this);
        this.uiStore = new uiStore(this);
    }

}