package com.ffhs.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Entity class for Game
 */
@Entity
public class Game {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int gameId;

    private int gameIdInTournament;

    private int tournamentId;

    private String p1Id;

    private String p2Id;

    private int p1Score;

    private int p2Score;

    /**
     * @return int returns the gameId
     */
    public int getGameId() {
        return gameId;
    }

    /**
     * sets the gameId
     * @param gameId int
     */
    public void setGameId(int gameId) {
        this.gameId = gameId;
    }

    /**
     * @return int returns the gameId withing the tournament
     */
    public int getGameIdInTournament() {
        return gameIdInTournament;
    }

    /**
     * sets the gameId within the tournament
     * @param gameIdInTournament int
     */
    public void setGameIdInTournament(int gameIdInTournament) {
        this.gameIdInTournament = gameIdInTournament;
    }

    /**
     * @return int returns the tournamentId
     */
    public int getTournamentId() {
        return tournamentId;
    }

    /**
     * sets the tournamentId
     * @param tournamentId int
     */
    public void setTournamentId(int tournamentId) {
        this.tournamentId = tournamentId;
    }

    /**
     * @return String returns the guid of player1
     */
    public String getP1Id() {
        return p1Id;
    }

    /**
     * sets the guid of player1
     * @param p1Id String
     */
    public void setP1Id(String p1Id) {
        this.p1Id = p1Id;
    }

    /**
     * @return String returns the guid of player2
     */
    public String getP2Id() {
        return p2Id;
    }

    /**
     * sets the guid of player2
     * @param p2Id String
     */
    public void setP2Id(String p2Id) {
        this.p2Id = p2Id;
    }

    /**
     * @return int returns the score of player1
     */
    public int getP1Score() {
        return p1Score;
    }

    /**
     * sets the score of player1
     * @param p1Score int
     */
    public void setP1Score(int p1Score) {
        this.p1Score = p1Score;
    }

    /**
     * @return int returns the score of player1
     */
    public int getP2Score() {
        return p2Score;
    }

    /**
     * sets the score of player1
     * @param p2Score int
     */
    public void setP2Score(int p2Score) {
        this.p2Score = p2Score;
    }
}
