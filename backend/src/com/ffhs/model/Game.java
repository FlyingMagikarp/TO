package com.ffhs.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Game {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int game_id;

    private int tournament_id;

    private String player1;

    private String player2;

    public int getId() {
        return game_id;
    }

    public int getTournament_id() {
        return tournament_id;
    }

    public String getPlayer1() {
        return player1;
    }

    public String getPlayer2() {
        return player2;
    }

    public void setId(int id) {
        this.game_id = id;
    }

    public void setTournament_id(int tournament_id) {
        this.tournament_id = tournament_id;
    }

    public void setPlayer1(String player1) {
        this.player1 = player1;
    }

    public void setPlayer2(String player2) {
        this.player2 = player2;
    }

}
