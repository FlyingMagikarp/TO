package com.ffhs.services;

import com.ffhs.model.PlayerRanking;
import com.ffhs.model.Tournament;
import com.ffhs.repository.LeagueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class LeagueService {
    @Autowired
    LeagueRepository leagueRepository;
    @Autowired
    TournamentService tournamentService;

    public ArrayList<PlayerRanking> getLeagueRanking(int leagueId){
        ArrayList<Tournament> tournaments = tournamentService.getTournamentsByLeagueId(leagueId);

        ArrayList<PlayerRanking> pr = new ArrayList<>();
        return pr;
    }





}
