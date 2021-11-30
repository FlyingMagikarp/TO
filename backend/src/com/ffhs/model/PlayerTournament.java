package com.ffhs.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class PlayerTournament {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;

    private int tournamentId;

    private String playerId;

    public int getId(){
        return this.id;
    }

    public int getTournamentId(){
        return tournamentId;
    }

    public String getPlayerId(){
        return playerId;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setTournamentId(int tournamentId) {
        this.tournamentId = tournamentId;
    }

    public void setPlayerId(String playerId) {
        this.playerId = playerId;
    }
}
