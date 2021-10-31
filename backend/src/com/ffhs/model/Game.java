package com.ffhs.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Game {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int gameId;

    private int tournamentId;

    private String player1;

    private String player2;

    private int scoreP1;

    private int scoreP2;

    private boolean archived;

    public int getId() {
        return gameId;
    }

    public int getTournamentId() {
        return tournamentId;
    }

    public String getPlayer1() {
        return player1;
    }

    public String getPlayer2() {
        return player2;
    }

    public void setId(int id) {
        this.gameId = id;
    }

    public void setTournamentId(int tournamentId) {
        this.tournamentId = tournamentId;
    }

    public void setPlayer1(String player1) {
        this.player1 = player1;
    }

    public void setPlayer2(String player2) {
        this.player2 = player2;
    }

    public void setScoreP1(int scoreP1){
        this.scoreP1 = scoreP1;
    }

    public void setScoreP2(int scoreP2){
        this.scoreP2 = scoreP2;
    }

    public int getScoreP1(){
        return this.scoreP1;
    }

    public int getScoreP2(){
        return this.scoreP2;
    }

    private void setArchived(boolean archived){
        this.archived = archived;
    }

    private boolean getArchived(){
        return archived;
    }
}
