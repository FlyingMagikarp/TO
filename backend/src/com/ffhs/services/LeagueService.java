package com.ffhs.services;

import com.ffhs.model.Player;
import com.ffhs.model.PlayerDto;
import com.ffhs.model.PlayerRanking;
import com.ffhs.model.Tournament;
import com.ffhs.repository.LeagueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Service for League
 */
@Service
public class LeagueService {
    /**
     * Data repository for leagues
     */
    @Autowired
    LeagueRepository leagueRepository;
    /**
     * Service for tournaments
     */
    @Autowired
    TournamentService tournamentService;

    /**
     * takes a leagueId and two dates as parameter and returns the ranking of a league
     * for all tournaments in that timeframe
     * @param leagueId int id of the league
     * @param fromDate Date
     * @param toDate Date
     * @return ArrayList&lt;PlayerRanking&gt; Sorted list of players with their corresponding score
     */
    public ArrayList<PlayerRanking> getLeagueRanking(int leagueId, Date fromDate, Date toDate){
        ArrayList<Tournament> tournaments = tournamentService.getTournamentsByLeagueId(leagueId, fromDate, toDate);

        ArrayList<ArrayList<PlayerRanking>> listOfAllRankings = new ArrayList<>();
        for(Tournament t : tournaments){
            listOfAllRankings.add(tournamentService.getRoundRobinRanking(t.getTournamentId()));
        }

        return calculateLeagueRanking(listOfAllRankings);
    }

    /**
     * takes a list of tournament rankings and calculates the league ranking based on that.
     * <p>
     *     The players get points based on their placement in all the tournaments.
     *     The formula used is: n*n / (2^ceil(log(placement, 2))
     *     where <b>n</b> is the total amount of players in the tournament and the <b>placement</b>
     *     is the rank that they placed as.
     *     Math.ceil(x) returns the next int that is equal or larger than x
     *
     *     This formula scales with total entrants so winners of large tournaments
     *     get more points than winners of small ones
     * </p>
     * @param allRankings ArrayList&lt;ArrayList&lt;PlayerRanking&gt;&gt; List of tournament rankings
     * @return ArrayList&lt;PlayerRanking&gt; list of players with their score within the league
     */
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

    /**
     * Takes a list of tournament results and returns a list of playerRankings without duplicates
     * @param allRankings ArrayList&lt;ArrayList&lt;PlayerRanking&gt;&gt; List of tournament rankings
     * @return ArrayList&lt;PlayerRanking&gt; playerRanking list without duplicates
     */
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

        Set<PlayerDto> s = new HashSet<PlayerDto>(allPlayers);
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

    /**
     * Returns the logarithm of N with base 2
     * @param N int argument for the logarithm
     * @return int result
     */
    public int log2(int N) {
        return (int)(Math.log(N) / Math.log(2));
    }



}
