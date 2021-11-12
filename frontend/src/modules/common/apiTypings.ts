
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
    players: string[],
    rankedPlayer: string[],
    leagueId: number,
    archived: boolean
}

export interface IPlayerData {
    guid: string,
    tag: string,
    archived: boolean
}