import League from "../stores/models/league";
import Constants from "../../../util/Constants";
import axios from "axios";

const LeagueService = {

    async saveNewLeague(league: League): Promise<any> {
        const result = await axios.post(Constants.C_API_BASEURL + 'league/add', league);
        return result.data;
    },

    async getAllLeagues(): Promise<any> {
        const result = await axios.get(Constants.C_API_BASEURL + 'league/all', {});
        return result.data;
    },

    async getLeagueById(league_id: number): Promise<any> {
        const result = await axios.get(Constants.C_API_BASEURL + 'league/getById', {params: {league_id: league_id}});
        return result.data;
    },

    async updateLeague(league: League): Promise<any> {
        const result = await axios.post(Constants.C_API_BASEURL + 'league/update', league);
        return result.data;
    }

};

export default LeagueService;