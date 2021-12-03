package com.ffhs.services;

import com.ffhs.model.Game;
import com.ffhs.model.Player;
import com.ffhs.model.PlayerRanking;
import com.ffhs.model.Tournament;
import com.ffhs.repository.GameRepository;
import com.ffhs.repository.PlayerRepository;
import com.ffhs.repository.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@Service
@Transactional
public class TournamentService {
    @Autowired
    private TournamentRepository tournamentRepository;
    @Autowired
    private PlayerRepository playerRepository;
    @Autowired
    private PlayerService playerService;
    @Autowired
    private GameRepository gameRepository;


    public Set<Player> getPlayerObjectsFromIds(ArrayList<String> playerIds){
        Set<Player> players = new HashSet<>();
        for(String pid : playerIds){
            Optional<Player> op = playerService.getPlayerObjectById(pid);
            op.ifPresent(players::add);
        }
        return players;
    }

    private ArrayList<Game> getGamesByTournamentId(int tournamentId){
        Iterable<Game> allGames = gameRepository.findAll();
        return (ArrayList<Game>) StreamSupport.stream(allGames.spliterator(), false)
                .filter(game -> tournamentId == game.getTournamentId())
                .collect(Collectors.toList());
    }

    public ArrayList<Game> getRoundRobinGames(int tournamentId){
        ArrayList<Game> gamesFound = getGamesByTournamentId(tournamentId);
        if (gamesFound.size() > 0){
            return gamesFound;
        }
        return createRoundRobinGames(tournamentId);
    }

    private ArrayList<Game> createRoundRobinGames(int tournamentId){
        ArrayList<Game> games = new ArrayList<Game>();
        Tournament t = new Tournament();
        Optional<Tournament> tmp = tournamentRepository.findById(tournamentId);
        if(tmp.isPresent()){
            t = tmp.get();
        }

        Set<Player> players = t.getPlayers();

        if(players.size() % 2 != 0){
            Player p = new Player();
            p.setGuid("dummy");
            p.setTag("dummy");
            players.add(p);
        }

        int numberOfRounds = (players.size() - 1);
        int halfSize = players.size() / 2;

        List<Player> teams = new ArrayList<>(players);
        int gameNrCount = 0;
        for(int round = 0; round < numberOfRounds; round++){
            for (int i = 0; i < halfSize; i++){
                int firstTeamIndex = (i);
                int secondTeamIndex = (i+halfSize);

                games.add(createGame(teams.get(firstTeamIndex).getGuid(), teams.get(secondTeamIndex).getGuid(), tournamentId, gameNrCount));
                gameNrCount++;
            }

            teams.add(1,teams.get(teams.size()-1));
            teams.remove(teams.size()-1);
        }

        return games;
    }

    private Game createGame(String p1, String p2, int tournamentId, int gameNr){
        Game m = new Game();
        m.setTournamentId(tournamentId);
        m.setP1Id(p1);
        m.setP2Id(p2);
        m.setGameIdInTournament(gameNr);

        return m;
    }

    public ArrayList<PlayerRanking> getRoundRobinRanking(int tournamentId){
        Optional<Tournament> tournament = tournamentRepository.findById(tournamentId);
        Set<Player> allPlayers = tournament.get().getPlayers();

        ArrayList<PlayerRanking> playerRanking = new ArrayList<>();
        playerRanking = (ArrayList<PlayerRanking>) allPlayers.stream()
                .map(player -> {return new PlayerRanking(0, player);})
                .collect(Collectors.toList());

        ArrayList<Game> allGames = getGamesByTournamentId(tournamentId);

        for(Game g : allGames){
            if(g.getP1Score() > g.getP2Score()){
                int index = getRankingIndex(g.getP1Id(), playerRanking);
                PlayerRanking pr = playerRanking.get(index);
                pr.setScore(pr.getScore()+3);
                playerRanking.set(index, pr);
            }else if(g.getP1Score() < g.getP2Score()){
                int index = getRankingIndex(g.getP2Id(), playerRanking);
                PlayerRanking pr = playerRanking.get(index);
                pr.setScore(pr.getScore()+3);
                playerRanking.set(index, pr);
            } else {
                //each 1 point
                int index = getRankingIndex(g.getP1Id(), playerRanking);
                PlayerRanking pr = playerRanking.get(index);
                pr.setScore(pr.getScore()+1);
                playerRanking.set(index, pr);

                index = getRankingIndex(g.getP2Id(), playerRanking);
                pr = playerRanking.get(index);
                pr.setScore(pr.getScore()+1);
                playerRanking.set(index, pr);
            }
        }

        Collections.sort(playerRanking);

        playerRanking = (ArrayList<PlayerRanking>) playerRanking.stream()
                                    .sorted(Comparator.reverseOrder())
                                    .collect(Collectors.toList());
        return playerRanking;
    }

    private int getRankingIndex(String guid, ArrayList<PlayerRanking> playerRankingList){
        for(int i = 0; i<playerRankingList.size();i++){
            if (guid.equals(playerRankingList.get(i).getPlayer().getGuid())){
                return i;
            }
        }
        return -1;
    }

}
