package com.ffhs.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.Date;

@Entity
public class Tournament {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int tournamentId;

    private String location;

    private String name;

    private Date date;

    private String starttime;

    private String format;

    private ArrayList<String> players;

    private ArrayList<String> rankedPlayer;

    private int leagueId;

    private boolean archived;

    public int getId() {
        return tournamentId;
    }

    public String getLocation() {
        return location;
    }

    public String getName() {
        return name;
    }

    public Date getDate() {
        return date;
    }

    public String getStarttime() {
        return starttime;
    }

    public String getFormat() {
        return format;
    }

    public ArrayList<String> getPlayers() {
        return players;
    }

    public ArrayList<String> getRankedPlayer() {
        return rankedPlayer;
    }

    public void setId(int id) {
        this.tournamentId = id;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setStarttime(String startime) {
        this.starttime = startime;
    }

    public void setFormat(String format) {
        this.format = format;
    }

    public void setPlayers(ArrayList<String> players) {
        this.players = players;
    }

    public void setRankedPlayer(ArrayList<String> rankedPlayer) {
        this.rankedPlayer = rankedPlayer;
    }

    public int getLeagueId() {
        return leagueId;
    }

    public void setLeagueId(int leagueId) {
        this.leagueId = leagueId;
    }

    public void setArchived(boolean archived){
        this.archived = archived;
    }

    public boolean getArchived(){
        return archived;
    }
}
