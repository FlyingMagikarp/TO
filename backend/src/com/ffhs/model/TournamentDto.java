package com.ffhs.model;


import java.util.ArrayList;
import java.util.Date;

public class TournamentDto {
    private int tournamentId;

    private String location;

    private String name;

    private Date date;

    private String starttime;

    private String format;

    private ArrayList<String> playerIds;

    private ArrayList<String> rankedPlayers;

    private int leagueId;

    private boolean archived;

    public int getTournamentId() {
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

    public ArrayList<String> getPlayerIds() {
        return playerIds;
    }

    public ArrayList<String> getRankedPlayers() {
        return rankedPlayers;
    }

    public void setTournamentId(int id) {
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

    public void setPlayerIds(ArrayList<String> playerIds) {
        this.playerIds = playerIds;
    }

    public void setRankedPlayers(ArrayList<String> rankedPlayers) {
        this.rankedPlayers = rankedPlayers;
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
