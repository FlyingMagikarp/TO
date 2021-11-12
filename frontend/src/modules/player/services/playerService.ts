import axios from "axios";
import Constants from "../../../util/Constants";
import Player from "../stores/models/player";


const PlayerService = {
    async getAllPlayers(): Promise<any> {
        const result = await axios.get(Constants.C_API_BASEURL + 'player/all', {});
        return result.data;
    },

    async getPlayerById(playerId:string): Promise<any> {
        const result = await axios.get(Constants.C_API_BASEURL + 'player/getById', {params: {guid: playerId}});
        return result.data;
    },

    async saveNewPlayer(player: Player): Promise<any> {
        const result = await axios.post(Constants.C_API_BASEURL + 'player/add', player);
        return result.data;
    },

    async updatePlayer(player: Player): Promise<any> {
        const result = await axios.post(Constants.C_API_BASEURL + 'player/update', player);
        return result.data;
    }
};

export default PlayerService;