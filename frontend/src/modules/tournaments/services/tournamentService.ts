import Tournament from "../stores/models/tournament";
import Game from "../stores/models/game";
import Constants from "../../../util/Constants";
import axios from "axios";


const TournamentService = {

    /**
     * Calls an endpoint to return all tournaments
     */
    async getAllTournaments(): Promise<any> {
        const result = await axios.get(Constants.C_API_BASEURL + 'tournament/all', {});
        return result.data;
    },

    /**
     * Takes a tournamentId and calls an endpoint to return the tournament data
     * @param tournamentId
     */
    async getTournamentById(tournamentId:number): Promise<any> {
        const result = await axios.get(Constants.C_API_BASEURL + 'tournament/getById', {params: {tournamentId: tournamentId}});
        return result.data;
    },

    /**
     * Takes a tournament object and calls an endpoint to persist it
     * @param tournament
     */
    async saveNewTournament(tournament: Tournament): Promise<any> {
        const result = await axios.post(Constants.C_API_BASEURL + 'tournament/add', tournament);
        return result.data;
    },

    /**
     * Takes a tournament object and calls an endpoint to update it
     * @param tournament
     */
    async updateTournament(tournament: Tournament): Promise<any> {
        const result = await axios.post(Constants.C_API_BASEURL + 'tournament/update', tournament);
        return result.data;
    },

    /**
     * Takes a tournamentId and calls an endpoint to return all games for a round robin tournament
     * @param tournamentId
     */
    async getRoundRobinGames(tournamentId:number): Promise<any> {
        const result = await axios.get(Constants.C_API_BASEURL + 'tournament/getMatchesRoundRobin', {params: {tournamentId: tournamentId}});
        return result.data;
    },

    /**
     * Takes a list of game objects and calls an endpoint to update them
     * @param games
     */
    async saveRoundRobinScore(games:Game[]): Promise<any> {
        const result = await axios.post(Constants.C_API_BASEURL + 'tournament/updateRoundRobin', games);
        return result.data;
    },

    /**
     * Takes a tournamentId and calls an endpoint to return the player ranking of a tournament
     * It is used for both round robin and single elimination
     * @param tournamentId
     */
    async getRoundRobinPlayerRanking(tournamentId:number): Promise<any>{
        const result = await axios.get(Constants.C_API_BASEURL + 'tournament/getRoundRobinPlayerRanking', {params: {tournamentId: tournamentId}});
        return result.data;
    },

    /**
     * Takes a tournamentId and calls an endpoint to return all games for a single elimination tournament
     * @param tournamentId
     */
    async getSingleEliminationGames(tournamentId:number): Promise<any>{
        const result = await axios.get(Constants.C_API_BASEURL + 'tournament/getMatchesSingleElim', {params: {tournamentId: tournamentId}});
        return result.data;
    },

    /**
     * Takes a list of single elimination games and calls an endpoint to update them
     * @param games
     */
    async saveSingleEliminationScore(games:Game[]): Promise<any>{
        const result = await axios.post(Constants.C_API_BASEURL + 'tournament/updateSingleElim', games);
        return result.data;
    }
};

export default TournamentService;