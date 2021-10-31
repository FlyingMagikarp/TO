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
    private int tournament_id;

    private String location;

    private String name;

    private Date date;

    private String startime;

    private String format;

    private ArrayList<String> players;

    private ArrayList<String> rankedPlayer;

    private int leagueId;

    public int getId() {
        return tournament_id;
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

    public String getStartime() {
        return startime;
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
        this.tournament_id = id;
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

    public void setStartime(String startime) {
        this.startime = startime;
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

}
