import {computed, observable, runInAction} from "mobx";
import RootStore from "../../../rootStore";

export default class UiStore {
    public static storeName: string = 'uiStore';
    private static WIDTH_LG = 1200;
    private static WIDTH_MD = 960;
    private static WIDTH_SM = 600;
    private static MAX_WIDTH = 1920;

    public rootStore: RootStore;

    @observable public width: number = window.innerWidth > UiStore.MAX_WIDTH ? UiStore.MAX_WIDTH : window.innerWidth;
    @observable public height: number = window.innerHeight;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        window.addEventListener('resize', () => this.handleResize());
    }

    private handleResize() {
        runInAction(() => {
            this.width = window.innerWidth > UiStore.MAX_WIDTH ? UiStore.MAX_WIDTH : window.innerWidth;
            this.height = window.innerHeight;
        });
    }

    @computed
    public get isLargeScreenDown() {
        return this.width <= UiStore.WIDTH_LG;
    };

    @computed
    public get isLargeScreenUp() {
        return this.width >= UiStore.WIDTH_LG;
    };

    @computed
    public get isMediumScreenDown() {
        return this.width <= UiStore.WIDTH_MD;
    };

    @computed
    public get isMediumScreenUp() {
        return this.width >= UiStore.WIDTH_MD;
    };

    @computed
    public get isSmallScreenDown() {
        return this.width <= UiStore.WIDTH_SM;
    };

    @computed
    public get isSmallScreenUp() {
        return this.width >= UiStore.WIDTH_SM;
    };

}