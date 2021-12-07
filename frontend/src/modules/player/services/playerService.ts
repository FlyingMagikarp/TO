import axios from "axios";
import Constants from "../../../util/Constants";
import Player from "../stores/models/player";


const PlayerService = {
    /**
     * Calls an endpoint to return all players
     */
    async getAllPlayers(): Promise<any> {
        const result = await axios.get(Constants.C_API_BASEURL + 'player/all', {});
        return result.data;
    },

    /**
     * Takes a playerId and calls an endpoint to return the player data
     * @param playerId
     */
    async getPlayerById(playerId:string): Promise<any> {
        const result = await axios.get(Constants.C_API_BASEURL + 'player/getById', {params: {guid: playerId}});
        return result.data;
    },

    /**
     * Takes a player object and calls an endpoint to persist it
     * @param player
     */
    async saveNewPlayer(player: Player): Promise<any> {
        const result = await axios.post(Constants.C_API_BASEURL + 'player/add', player);
        return result.data;
    },

    /**
     * Takes a player object and calls an endpoint to update it
     * @param player
     */
    async updatePlayer(player: Player): Promise<any> {
        const result = await axios.post(Constants.C_API_BASEURL + 'player/update', player);
        return result.data;
    }
};

export default PlayerService;