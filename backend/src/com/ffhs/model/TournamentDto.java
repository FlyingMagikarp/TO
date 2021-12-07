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

    /**
     * @return int returns the tournamentId
     */
    public int getTournamentId() {
        return tournamentId;
    }

    /**
     * @return String returns the location
     */
    public String getLocation() {
        return location;
    }

    /**
     * @return String returns the name
     */
    public String getName() {
        return name;
    }

    /**
     * @return Date returns the date
     */
    public Date getDate() {
        return date;
    }

    /**
     * @return String returns the starttime
     */
    public String getStarttime() {
        return starttime;
    }

    /**
     * @return String returns the format
     */
    public String getFormat() {
        return format;
    }

    /**
     * @return ArrayList&lt;Player&gt; returns a list of all playerIds
     */
    public ArrayList<String> getPlayerIds() {
        return playerIds;
    }

    /**
     * @return ArrayList&lt;String&gt; returns a ranked list of players
     */
    public ArrayList<String> getRankedPlayers() {
        return rankedPlayers;
    }

    /**
     * Sets the tournamentID
     * @param id int
     */
    public void setTournamentId(int id) {
        this.tournamentId = id;
    }

    /**
     * Sets the location
     * @param location String
     */
    public void setLocation(String location) {
        this.location = location;
    }

    /**
     * Sets the name
     * @param name String
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Sets the date
     * @param date Date
     */
    public void setDate(Date date) {
        this.date = date;
    }

    /**
     * Sets the starttime
     * @param startime String
     */
    public void setStarttime(String startime) {
        this.starttime = startime;
    }

    /**
     * Sets the format
     * @param format String
     */
    public void setFormat(String format) {
        this.format = format;
    }

    /**
     * Sets the playerIds list
     * @param playerIds ArrayList&lt;String&gt;
     */
    public void setPlayerIds(ArrayList<String> playerIds) {
        this.playerIds = playerIds;
    }

    /**
     * sets the list of ranked players
     * @param rankedPlayers ArrayList&lt;String&gt;
     */
    public void setRankedPlayers(ArrayList<String> rankedPlayers) {
        this.rankedPlayers = rankedPlayers;
    }

    /**
     * @return int returns the leagueId
     */
    public int getLeagueId() {
        return leagueId;
    }

    /**
     * Sets the leagueId
     * @param leagueId int
     */
    public void setLeagueId(int leagueId) {
        this.leagueId = leagueId;
    }

    /**
     * Sets the archived flag
     * @param archived boolean
     */
    public void setArchived(boolean archived){
        this.archived = archived;
    }

    /**
     * @return boolean returns the archived flag
     */
    public boolean getArchived(){
        return archived;
    }

}
