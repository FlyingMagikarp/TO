package com.ffhs.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class League {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int league_id;

    private String name;

    private String location;

    private String sport;

    private boolean archived;

    public int getLeague_id() {
        return league_id;
    }

    public String getName() {
        return name;
    }

    public String getLocation() {
        return location;
    }

    public String getSport() {
        return sport;
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

    public void setSport(String sport) {
        this.sport = sport;
    }

    public void setArchived(boolean archived){
        this.archived = archived;
    }

    public boolean getArchived(){
        return archived;
    }
}
