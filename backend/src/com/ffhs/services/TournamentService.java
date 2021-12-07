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


/**
 * Service for Tournament
 */
@Service
@Transactional
public class TournamentService {
    @Autowired
    private TournamentRepository tournamentRepository;
    @Autowired
    private PlayerService playerService;
    @Autowired
    private GameRepository gameRepository;


    /**
     * Takes a list of playerIds and returns a set of player model objects
     * @param playerIds ArrayList<String> List of playerIds
     * @return Set<Player> list of player model object
     */
    public Set<Player> getPlayerObjectsFromIds(ArrayList<String> playerIds){
        Set<Player> players = new HashSet<>();
        for(String pid : playerIds){
            Optional<Player> op = playerService.getPlayerObjectById(pid);
            op.ifPresent(players::add);
        }
        return players;
    }

    /**
     * takes a tournamentId as parameter and all corresponding games
     * @param tournamentId int id of tournament
     * @return ArrayList<Game> list of games
     */
    private ArrayList<Game> getGamesByTournamentId(int tournamentId){
        Iterable<Game> allGames = gameRepository.findAll();
        return (ArrayList<Game>) StreamSupport.stream(allGames.spliterator(), false)
                .filter(game -> tournamentId == game.getTournamentId())
                .collect(Collectors.toList());
    }

    /**
     * takes a tournamentId as parameter and either looks for games and returns them
     * or creates all round robin games
     * @param tournamentId int id of tournament
     * @return ArrayList<Game> list of games
     */
    public ArrayList<Game> getRoundRobinGames(int tournamentId){
        ArrayList<Game> gamesFound = getGamesByTournamentId(tournamentId);
        if (gamesFound.size() > 0){
            return gamesFound;
        }
        return createRoundRobinGames(tournamentId);
    }

    /**
     * For the round robin pairing algorithm to work a even number of players is needed.
     * If the number is odd a "bye" player is added.
     * <p>
     *     The player array is split in half and the first round of pairings are generated.
     *     then leaving the first player fixated the rest of players rotate 1 position clockwise.
     *     This continues until for the number of rounds. This number is equal to number of entrants - 1
     * </p>
     * @param tournamentId int id of tournamentid
     * @return ArrayList<Game> list of round robin games
     */
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

    /**
     * Takes two playerids, a tournamentId and a gameNr, creates a game object and returns it
     * @param p1 String guid of player1
     * @param p2 String guid of player2
     * @param tournamentId int id of tournament
     * @param gameNr int gameNr
     * @return Game created game
     */
    private Game createGame(String p1, String p2, int tournamentId, int gameNr){
        Game m = new Game();
        m.setTournamentId(tournamentId);
        m.setP1Id(p1);
        m.setP2Id(p2);
        m.setGameIdInTournament(gameNr);

        return m;
    }

    /**
     * Takes a tournamentId and calculates a ranking based on results.
     * This function was written for the round robin format but since it also works
     * for single elimination it is also used there
     * <p>
     *     The ranking is pretty simple. The winner gets 3 points,
     *     the looser 0 and in case there's a draw, both players get 1 point each.
     *
     *     The list then is sorted based on the score
     * </p>
     * @param tournamentId int id of tournament
     * @return ArrayList<PlayerRanking> ranked list of players
     */
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

    /**
     * Take a player guid and a ranking list as a parameter and
     * returns the index of the player within the ranking list
     * @param guid String guid of a player
     * @param playerRankingList ArrayList<PlayerRanking> ranking list
     * @return int index of player in ranking list
     */
    public int getRankingIndex(String guid, ArrayList<PlayerRanking> playerRankingList){
        for(int i = 0; i<playerRankingList.size();i++){
            if (guid.equals(playerRankingList.get(i).getPlayer().getGuid())){
                return i;
            }
        }
        return -1;
    }

    /**
     * takes a leagueId and two dates as parameter and
     * returns all tournaments of a league in the given timeframe
     * @param leagueId int id of the league
     * @param fromDate Date
     * @param toDate Date
     * @return ArrayList<Tournament> list of all tournaments
     */
    public ArrayList<Tournament> getTournamentsByLeagueId(int leagueId, Date fromDate, Date toDate){
        Iterable<Tournament> allTournaments = tournamentRepository.findAll();
        return (ArrayList<Tournament>) StreamSupport.stream(allTournaments.spliterator(), false)
                .filter(game -> leagueId == game.getLeagueId())
                .filter(game -> !game.getArchived())
                .filter(game -> fromDate.before(game.getDate()))
                .filter(game -> toDate.after(game.getDate()))
                .collect(Collectors.toList());
    }

    /**
     * Takes a tournamentId as parameter and returns the ranking of that tournament
     * @param tournamentId id of tournament
     * @return ArrayList<PlayerRanking> player ranking of tournament
     */
    public ArrayList<PlayerRanking> getTournamentRanking(int tournamentId){
        Tournament tournament = tournamentRepository.findById(tournamentId).get();
        if("Round Robin".equals(tournament.getFormat())){
            return getRoundRobinRanking(tournamentId);
        }//TODO check if necessary
        return null;
    }

    /**
     * Takes a tournamentId as parameter and returns(creates if necessary)
     * all games for the single elimination format
     *
     * <p>
     *     The total amount of games needed for this format is number of entrants - 1
     *     If the amount of games found is 0, it will create the first round of games.
     *     If the amount of games found equals the amount needed for the tounament
     *     to be completed, it returns them all.
     *     If the amount of games found is greater than 0 but not the full amount,
     *     it creates all games for the next round
     * </p>
     * @param tournamentId id of tournament
     * @return ArrayList<Game> list of games for single elimination format
     */
    public ArrayList<Game> getSingleEliminationGames(int tournamentId){
        ArrayList<Game> gamesFound = getGamesByTournamentId(tournamentId);
        Set<Player> allPlayer = tournamentRepository.findById(tournamentId).get().getPlayers();

        int roundId = getLowestInternalGameId(gamesFound);
        ArrayList<Game> prevRoundGames = filterGameListByInternalId(roundId, gamesFound);

        if (gamesFound.size() == allPlayer.size()-1){
            return gamesFound;
        } else if(gamesFound.size() > 0){
            gamesFound.addAll(getNextSingleEliminationGames(tournamentId, prevRoundGames));
            return gamesFound;
        }
        return getFirstRoundSingleEliminationGames(tournamentId);
    }

    /**
     * Takes a tournamentId and a list of games and generates and
     * returns the next round of games for the single elimination format
     * <p>
     *     The logic is similar to the first round of games
     *     except instead of all players only the winners remain.
     *
     *     Since in the first round the list was extended to be a power of 2,
     *     that check is not needed here.
     * </p>
     * @param tournamentId int id of tournament
     * @param prevRoundGames ArrayList<Game> list of all the games from the previous round
     * @return ArrayList<Game> list of all games for the next round
     */
    private ArrayList<Game> getNextSingleEliminationGames(int tournamentId, ArrayList<Game> prevRoundGames){
        ArrayList<Game> games = new ArrayList<>();
        ArrayList<Player> winners = getWinnersFromSingleEliminationRound(prevRoundGames);

        for (int i = 0, j = winners.size()/2;i<winners.size()/2;i++,j++){
            Game g = new Game();
            g.setTournamentId(tournamentId);
            g.setGameIdInTournament(winners.size());
            g.setP1Id(winners.get(i).getGuid());
            g.setP2Id(winners.get(j).getGuid());

            games.add(g);
        }
        int tmp = winners.size()/4;
        while(tmp >= 1){
            games.addAll(getPlaceholderGamesForSingleElim(tmp));
            tmp = tmp/2;
        }

        return games;
    }

    /**
     * Takes a tournamentId as parameter and create the games needed for the first round of
     * the single elimination format.
     * <p>
     *     For the format to work the number of entrants has to be a power of 2.
     *     If there aren't enough entrants it will generate 'bye' player until it is a power of 2.
     *     For the pairings the upper half of the array will play the lower half to ensure that
     *     all 'byes' are eliminated in the first round.
     *
     *     After generating the first round, placeholder games for all the other round will be generated.
     *     This is purely for aesthetics during rendering.
     * </p>
     * @param tournamentId int id of tournament
     * @return ArrayList<Game> list of all games
     */
    public ArrayList<Game> getFirstRoundSingleEliminationGames(int tournamentId){
        ArrayList<Game> games = new ArrayList<>();

        Tournament tournament = tournamentRepository.findById(tournamentId).get();
        if (!isPowerOfTwo(tournament.getPlayers().size())){
            tournament.setPlayers(fillPlayerListUntilPowerOfTwo(tournament.getPlayers()));
        }

        ArrayList<Player> players = new ArrayList<>(tournament.getPlayers());

        for (int i = 0, j = players.size()/2;i<players.size()/2;i++,j++){
            Game g = new Game();
            g.setTournamentId(tournamentId);
            g.setGameIdInTournament(players.size());
            g.setP1Id(players.get(i).getGuid());
            g.setP2Id(players.get(j).getGuid());

            games.add(g);
        }
        int tmp = players.size()/4;
        while(tmp >= 1){
            games.addAll(getPlaceholderGamesForSingleElim(tmp));
            tmp = tmp/2;
        }

        return games;
    }

    /**
     * Takes an integer as parameter and generates that many placeholder games
     * @param amount int number of game sto generate
     * @return ArrayList<Game> list of generated palceholder games
     */
    private ArrayList<Game> getPlaceholderGamesForSingleElim(int amount){
        ArrayList<Game> games = new ArrayList<>();
        for(int i = 0; i<amount;i++){
            Game g = new Game();
            g.setTournamentId(-1);
            g.setP1Id("TBD");
            g.setP2Id("TBD");
            games.add(g);
        }
        return games;
    }

    /**
     * Takes a integer as parameter and checks whether that number is a power of 2
     * @param x int number to check
     * @return boolean true number is a power of 2
     */
    private boolean isPowerOfTwo(int x){
        return (x & (x - 1)) == 0;
    }

    private Set<Player> fillPlayerListUntilPowerOfTwo(Set<Player> players){
        while(!isPowerOfTwo(players.size())){
            Player tmp = new Player();
            tmp.setTag("Bye");
            tmp.setGuid("Bye");
            players.add(tmp);
        }

        return players;
    }

    /**
     * Takes a list of games as parameter and return the players that won games in that round.
     * @param round ArrayList<Game> list of games
     * @return ArrayList<Player> list of player that won games
     */
    private ArrayList<Player> getWinnersFromSingleEliminationRound(ArrayList<Game>round){
        ArrayList<Player> players = new ArrayList<>();
        for(Game g : round){
            if(g.getP1Score()>g.getP2Score()){
                players.add(playerService.getPlayerObjectById(g.getP1Id()).get());
            } else {
                players.add(playerService.getPlayerObjectById(g.getP2Id()).get());
            }
        }

        return players;
    }

    /**
     * Takes a list of games as parameter and returns the lowest gameIdInTournament used.
     * @param games ArrayList<Game> list of games
     * @return int id lowest gameIdInTournament field in list
     */
    private int getLowestInternalGameId(ArrayList<Game> games){
        int id = 100;
        for (Game g : games){
            id = Math.min(id, g.getGameIdInTournament());
        }
        return id;
    }

    /**
     * Takes a roundId/gameIdInTournament and a list of games
     * and returns only the games with that roundId/gameIdInTournament
     * @param roundId int roundId
     * @param unfilteredGames ArrayList<Game> list of games
     * @return ArrayList<Game> list of filtered games
     */
    private ArrayList<Game> filterGameListByInternalId(int roundId, ArrayList<Game> unfilteredGames){
        ArrayList<Game> games = new ArrayList<>();

        for (Game g : unfilteredGames){
            if (g.getGameIdInTournament() == roundId){
                games.add(g);
            }
        }

        return games;
    }

}
