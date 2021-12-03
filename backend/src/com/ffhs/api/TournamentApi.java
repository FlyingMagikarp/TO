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

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Tournament> getAllTournaments(){
        return tournamentRepository.findAll();
    }

    @GetMapping(path="/getById")
    public @ResponseBody Optional<Tournament> getSingleTournamentById(@RequestParam int tournamentId){
        return tournamentRepository.findById(tournamentId);
    }

    @GetMapping(path="/getMatchesRoundRobin")
    public @ResponseBody ArrayList<Game> getMatchesForRoundRobin(@RequestParam int tournamentId){
        return tournamentService.getRoundRobinGames(tournamentId);
    }

    @PostMapping(path="updateRoundRobin", consumes = "application/json")
    public @ResponseBody void saveRoundRobinScore(@RequestBody ArrayList<Game> games){
        for(Game g : games){
            Game game = new Game();
            //tournamentService.saveRoundRobinScoreSingleGame(g);
            gameRepository.save(g);
        }
    }

    @GetMapping(path="/getRoundRobinPlayerRanking")
    public @ResponseBody ArrayList<PlayerRanking> getRoundRobinPlayerRanking(@RequestParam int tournamentId){
        return tournamentService.getRoundRobinRanking(tournamentId);
    }

}
