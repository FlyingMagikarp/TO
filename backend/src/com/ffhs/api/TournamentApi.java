package com.ffhs.api;

import com.ffhs.model.*;
import com.ffhs.repository.GameRepository;
import com.ffhs.repository.TournamentRepository;
import com.ffhs.services.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;
import java.util.Set;

/**
 * REST endpoint for tournaments
 */
@Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/tournament")
@Transactional
public class TournamentApi {
    @Autowired
    private TournamentRepository tournamentRepository;
    @Autowired
    private TournamentService tournamentService;
    @Autowired
    private GameRepository gameRepository;

    /**
     * Takes a tournamentDto object as parameter, creates a tournament model object and persists it
     * @param tournament TournamentDto data object
     * @return String success message
     */
    @PostMapping(path="/add", consumes = "application/json")
    public @ResponseBody java.lang.String addNewTournament(@RequestBody TournamentDto tournament){
        Tournament t = new Tournament();
        t.setLocation(tournament.getLocation());
        t.setName(tournament.getName());
        t.setDate(tournament.getDate());
        t.setStarttime(tournament.getStarttime());
        t.setFormat(tournament.getFormat());
        t.setLeagueId(tournament.getLeagueId());
        t.setDate(tournament.getDate());

        Set<Player> players = tournamentService.getPlayerObjectsFromIds(tournament.getPlayerIds());
        t.setPlayers(players);

        tournamentRepository.save(t);

        return "Tournament saved";
    }

    /**
     * Takes a tournamentDto object as parameter, creates a tournament model object and updates it
     * @param tournament TournamentDto data object
     * @return String success message
     */
    @PostMapping(path="/update", consumes = "application/json")
    public @ResponseBody java.lang.String updateTournament(@RequestBody TournamentDto tournament){
        Tournament t = new Tournament();
        t.setTournamentId(tournament.getTournamentId());
        t.setLocation(tournament.getLocation());
        t.setName(tournament.getName());
        t.setDate(tournament.getDate());
        t.setStarttime(tournament.getStarttime());
        t.setRankedPlayers(tournament.getRankedPlayers());
        t.setLeagueId(tournament.getLeagueId());
        t.setArchived(tournament.getArchived());
        t.setDate(tournament.getDate());

        Set<Player> players = tournamentService.getPlayerObjectsFromIds(tournament.getPlayerIds());
        t.setPlayers(players);

        Optional<Tournament> oldTournament = tournamentRepository.findById(tournament.getTournamentId());
        oldTournament.ifPresent(value -> t.setFormat(value.getFormat()));

        tournamentRepository.save(t);

        return "Tournament saved";
    }

    /**
     * Returns all Tournaments
     * @return Iterable<Tournament> list of all tournaments
     */
    @GetMapping(path="/all")
    public @ResponseBody Iterable<Tournament> getAllTournaments(){
        return tournamentRepository.findAll();
    }


    /**
     * takes a tournamentId as parameter and returns the found tournament model object
     * @param tournamentId int id of the tournament
     * @return Optional<Tournament> tournament model object
     */
    @GetMapping(path="/getById")
    public @ResponseBody Optional<Tournament> getSingleTournamentById(@RequestParam int tournamentId){
        return tournamentRepository.findById(tournamentId);
    }

    /**
     * takes a tournamentId as parameter and returns(and if necessary creates)
     * all games for the round robin format
     * @param tournamentId int id of the tournament
     * @return ArrayList<Game> list of all the games
     */
    @GetMapping(path="/getMatchesRoundRobin")
    public @ResponseBody ArrayList<Game> getMatchesForRoundRobin(@RequestParam int tournamentId){
        return tournamentService.getRoundRobinGames(tournamentId);
    }

    /**
     * takes a ArrayList of round robin games and updates it
     * @param games ArrayList of game model objects
     */
    @PostMapping(path="/updateRoundRobin", consumes = "application/json")
    public @ResponseBody void saveRoundRobinScore(@RequestBody ArrayList<Game> games){
        for(Game g : games){
            gameRepository.save(g);
        }
    }

    /**
     * takes a tournamentId as parameter and creates and returns the ranking of a tournament
     * @param tournamentId int id of the tournament
     * @return ArrayList<PlayerRanking> Sorted list of players with their corresponding score
     */
    @GetMapping(path="/getRoundRobinPlayerRanking")
    public @ResponseBody ArrayList<PlayerRanking> getRoundRobinPlayerRanking(@RequestParam int tournamentId){
        return tournamentService.getRoundRobinRanking(tournamentId);
    }

    /**
     * takes a tournamentId as parameter and returns(and if necessary creates)
     * all games for the single elimination format
     * @param tournamentId int id of the tournament
     * @return ArrayList<Game> list of all the games
     */
    @GetMapping(path="/getMatchesSingleElim")
    public @ResponseBody ArrayList<Game> getMatchesForSingleElimination(@RequestParam int tournamentId){
        return tournamentService.getSingleEliminationGames(tournamentId);
    }

    /**
     * takes a ArrayList of single elimination games and updates it
     * games where either of the player tags is 'TBD' are skipped because they are placeholder games
     * @param games ArrayList of game model objects
     */
    @PostMapping(path="/updateSingleElim", consumes = "application/json")
    public @ResponseBody ArrayList<Game> saveSingleElimScore(@RequestBody ArrayList<Game> games){
        for(Game g : games){
            if("TBD".equals(g.getP1Id()) || "TBD".equals(g.getP2Id())){
                continue;
            }
            gameRepository.save(g);
        }

        return tournamentService.getSingleEliminationGames(games.get(0).getTournamentId());
    }

}
