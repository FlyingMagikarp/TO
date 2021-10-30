package com.ffhs.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class League {
    @Id
    private int league_id;

    private String name;

    private String location;

    private String game;

    public int getLeague_id() {
        return league_id;
    }

    public String getName() {
        return name;
    }

    public String getLocation() {
        return location;
    }

    public String getGame() {
        return game;
    }

    public void setLeague_id(int league_id) {
        this.league_id = league_id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setGame(String game) {
        this.game = game;
    }
}
