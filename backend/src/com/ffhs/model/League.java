package com.ffhs.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Entity class for League
 */
@Entity
public class League {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int league_id;

    private String name;

    private String location;

    private String sport;

    private boolean archived;

    /**
     * @return int returns the league_id
     */
    public int getLeague_id() {
        return league_id;
    }

    /**
     * @return String returns the name
     */
    public String getName() {
        return name;
    }

    /**
     * @return String returns the location
     */
    public String getLocation() {
        return location;
    }

    /**
     * @return String returns the sport
     */
    public String getSport() {
        return sport;
    }

    /**
     * sets the league_id
     * @param league_id int
     */
    public void setLeague_id(int league_id) {
        this.league_id = league_id;
    }

    /**
     * sets the name
     * @param name String
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * sets the location
     * @param location String
     */
    public void setLocation(String location) {
        this.location = location;
    }

    /**
     * sets the sport
     * @param sport String
     */
    public void setSport(String sport) {
        this.sport = sport;
    }

    /**
     * sets the archived flag
     * @param archived boolean
     */
    public void setArchived(boolean archived){
        this.archived = archived;
    }

    /**
     * @return boolean returns the boolean flag
     */
    public boolean getArchived(){
        return archived;
    }
}
