import player from "../player/stores/models/player";
import tournament from "../tournaments/stores/models/tournament";

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
    playerIds: string[]
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