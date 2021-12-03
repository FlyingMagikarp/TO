package com.ffhs.model;


import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

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

    private ArrayList<String> rankedPlayers;

    private int leagueId;

    private boolean archived;

    @ManyToMany(cascade = {CascadeType.MERGE})
    @JoinTable(
            name = "PlayerTournament",
            joinColumns = {@JoinColumn(name = "tournamentId")},
            inverseJoinColumns = {@JoinColumn(name = "guid")}
    )
    @JsonManagedReference
    private Set<Player> players = new HashSet<>();

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

    public Set<Player> getPlayers(){
        return players;
    }

    public void setPlayers(Set<Player> players){
        this.players = players;
    }

}
