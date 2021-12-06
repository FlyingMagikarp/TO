package com.ffhs.services;

import com.ffhs.model.Player;
import com.ffhs.model.PlayerDto;
import com.ffhs.model.PlayerRanking;
import com.ffhs.model.Tournament;
import com.ffhs.repository.LeagueRepository;
import com.ffhs.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class LeagueService {
    @Autowired
    LeagueRepository leagueRepository;
    @Autowired
    TournamentService tournamentService;

    public ArrayList<PlayerRanking> getLeagueRanking(int leagueId, Date fromDate, Date toDate){
        ArrayList<Tournament> tournaments = tournamentService.getTournamentsByLeagueId(leagueId, fromDate, toDate);

        ArrayList<ArrayList<PlayerRanking>> listOfAllRankings = new ArrayList<>();
        for(Tournament t : tournaments){
            listOfAllRankings.add(tournamentService.getTournamentRanking(t.getTournamentId()));
        }

        return calculateLeagueRanking(listOfAllRankings);
    }

    private ArrayList<PlayerRanking> calculateLeagueRanking(ArrayList<ArrayList<PlayerRanking>> allRankings){
        ArrayList<PlayerRanking> allPlayersRanking = getAllPlayersFromRankingList(allRankings);

        for (ArrayList<PlayerRanking> pr : allRankings){
            int n = pr.size();
            for(int i = 0; i<pr.size(); i++){
                int score = (int) (n*n / Math.pow(2,Math.ceil(log2(i+1))));
                int rankingIndex = tournamentService.getRankingIndex(pr.get(i).getPlayer().getGuid(), allPlayersRanking);

                PlayerRanking tmp = allPlayersRanking.get(rankingIndex);
                tmp.setScore(tmp.getScore()+score);
                allPlayersRanking.set(rankingIndex, tmp);
            }
        }

        Collections.sort(allPlayersRanking);

        allPlayersRanking = (ArrayList<PlayerRanking>) allPlayersRanking.stream()
                .sorted(Comparator.reverseOrder())
                .collect(Collectors.toList());

        return allPlayersRanking;
    }

    private ArrayList<PlayerRanking> getAllPlayersFromRankingList(ArrayList<ArrayList<PlayerRanking>> allRankings){
        ArrayList<PlayerDto> allPlayers = new ArrayList<>();
        ArrayList<PlayerRanking> allPlayersRanking = new ArrayList<>();

        for (ArrayList<PlayerRanking> pr : allRankings){
            for (PlayerRanking player : pr){
                PlayerDto tmpPlayer = new PlayerDto();
                tmpPlayer.setTag(player.getPlayer().getTag());
                tmpPlayer.setGuid(player.getPlayer().getGuid());

                allPlayers.add(tmpPlayer);
            }
        }

        Set<PlayerDto> s= new HashSet<PlayerDto>();
        s.addAll(allPlayers);
        allPlayers.clear();
        allPlayers.addAll(s);

        for (PlayerDto p : allPlayers){
            Player tmpPlayer = new Player();
            tmpPlayer.setGuid(p.getGuid());
            tmpPlayer.setTag(p.getTag());

            allPlayersRanking.add(new PlayerRanking(0, tmpPlayer));
        }

        return allPlayersRanking;
    }

    private int log2(int N) {
        return (int)(Math.log(N) / Math.log(2));
    }



}
