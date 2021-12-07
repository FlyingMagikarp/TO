import Tournament from "../stores/models/tournament";
import Game from "../stores/models/game";
import Constants from "../../../util/Constants";
import axios from "axios";


const TournamentService = {
    async getAllTournaments(): Promise<any> {
        const result = await axios.get(Constants.C_API_BASEURL + 'tournament/all', {});
        return result.data;
    },

    async getTournamentById(tournamentId:number): Promise<any> {
        const result = await axios.get(Constants.C_API_BASEURL + 'tournament/getById', {params: {tournamentId: tournamentId}});
        return result.data;
    },

    async saveNewTournament(tournament: Tournament): Promise<any> {
        const result = await axios.post(Constants.C_API_BASEURL + 'tournament/add', tournament);
        return result.data;
    },

    async updateTournament(tournament: Tournament): Promise<any> {
        const result = await axios.post(Constants.C_API_BASEURL + 'tournament/update', tournament);
        return result.data;
    },

    async getRoundRobinGames(tournamentId:number): Promise<any> {
        const result = await axios.get(Constants.C_API_BASEURL + 'tournament/getMatchesRoundRobin', {params: {tournamentId: tournamentId}});
        return result.data;
    },

    async saveRoundRobinScore(games:Game[]): Promise<any> {
        const result = await axios.post(Constants.C_API_BASEURL + 'tournament/updateRoundRobin', games);
        return result.data;
    },

    async getRoundRobinPlayerRanking(tournamentId:number): Promise<any>{
        const result = await axios.get(Constants.C_API_BASEURL + 'tournament/getRoundRobinPlayerRanking', {params: {tournamentId: tournamentId}});
        return result.data;
    },

    async getSingleEliminationGames(tournamentId:number): Promise<any>{
        const result = await axios.get(Constants.C_API_BASEURL + 'tournament/getMatchesSingleElim', {params: {tournamentId: tournamentId}});
        return result.data;
    },

    async saveSingleEliminationScore(games:Game[]): Promise<any>{
        const result = await axios.post(Constants.C_API_BASEURL + 'tournament/updateSingleElim', games);
        return result.data;
    }
};

export default TournamentService;