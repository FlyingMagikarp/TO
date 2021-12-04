package com.ffhs.services;

import com.ffhs.model.PlayerRanking;
import com.ffhs.model.Tournament;
import com.ffhs.repository.LeagueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;

@Service
public class LeagueService {
    @Autowired
    LeagueRepository leagueRepository;
    @Autowired
    TournamentService tournamentService;

    public ArrayList<PlayerRanking> getLeagueRanking(int leagueId, Date date){
        // TODO: filter for date & archived
        ArrayList<Tournament> tournaments = tournamentService.getTournamentsByLeagueId(leagueId, date);

        ArrayList<ArrayList<PlayerRanking>> listOfAllRankings = new ArrayList<>();
        for(Tournament t : tournaments){
            listOfAllRankings.add(tournamentService.getTournamentRanking(t.getTournamentId()));
        }



        ArrayList<PlayerRanking> pr = new ArrayList<>();
        return pr;
    }

    public ArrayList<PlayerRanking> calculateLeagueRanking(ArrayList<ArrayList<PlayerRanking>> allRankings){
        //get all players / create return variable to edit
        ArrayList<PlayerRanking> pr = new ArrayList<>();

        //for every tourney
        //get player amount
        // n*n = points for first, (n*n)/2 for second
        return pr;
    }





}
