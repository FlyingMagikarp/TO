import player from "../player/stores/models/player";
import tournament from "../tournaments/stores/models/tournament";
import game from "../tournaments/stores/models/game";

export interface ILeagueData {
    league_id: number,
    name: string,
    sport: string,
    location: string,
    archived: boolean
}

export interface ITournamentData {
    tournamentId: number,
    name: string,
    location: string,
    date: Date,
    starttime: string,
    format: string,
    players: player[],
    rankedPlayer: string[],
    leagueId: number,
    archived: boolean,
    playerIds: string[],
    finished: boolean
}

export interface IPlayerData {
    guid: string,
    tag: string,
    archived: boolean
    tournaments: tournament[]
}

export interface IPlayerSelected {
    player: player,
    selected: boolean
}

export interface IGame {
    gameId: number,
    gameIdInTournament: number,
    tournamentId: number,
    p1Id: string,
    p2Id: string,
    p1Score: number,
    p2Score: number
}

export interface IRoundRobinRound {
    roundNr: number,
    games: game
}

export interface IPlayerRankingTournament {
    score: number,
    player: player
}