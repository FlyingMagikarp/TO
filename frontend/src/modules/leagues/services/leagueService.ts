import League from "../stores/models/league";
import Constants from "../../../util/Constants";
import axios from "axios";

const LeagueService = {

    /**
     * Takes a league object and calls an endpoint to persist it
     * @param league
     */
    async saveNewLeague(league: League): Promise<any> {
        const result = await axios.post(Constants.C_API_BASEURL + 'league/add', league);
        return result.data;
    },

    /**
     * Calls an endpoint to return all leagues
     */
    async getAllLeagues(): Promise<any> {
        const result = await axios.get(Constants.C_API_BASEURL + 'league/all', {});
        return result.data;
    },

    /**
     * Takes a league_id and calls an endpoint to return the league data
     * @param league_id
     */
    async getLeagueById(league_id: number): Promise<any> {
        const result = await axios.get(Constants.C_API_BASEURL + 'league/getById', {params: {league_id: league_id}});
        return result.data;
    },

    /**
     * Takes a league object and calls an endpoint to update it
     * @param league
     */
    async updateLeague(league: League): Promise<any> {
        const result = await axios.post(Constants.C_API_BASEURL + 'league/update', league);
        return result.data;
    },

    /**
     * Takes a league_id, fromDate and toDate and calls an endpoint to get the league ranking
     * @param league_id
     * @param fromDate
     * @param toDate
     */
    async getLeagueRanking(league_id: number, fromDate: string, toDate: string): Promise<any> {
        const result = await axios.get(Constants.C_API_BASEURL + 'league/getLeagueRanking', {params: {league_id: league_id, fromDate: fromDate, toDate: toDate}});
        return result.data;
    }

};

export default LeagueService;