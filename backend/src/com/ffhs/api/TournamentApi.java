package com.ffhs.api;

import com.ffhs.model.Player;
import com.ffhs.model.Tournament;
import com.ffhs.model.TournamentDto;
import com.ffhs.repository.TournamentRepository;
import com.ffhs.services.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
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

    @PostMapping(path="/add", consumes = "application/json")
    public @ResponseBody java.lang.String addNewTournament(@RequestBody TournamentDto tournament){
        Tournament t = new Tournament();
        t.setLocation(tournament.getLocation());
        t.setName(tournament.getName());
        t.setDate(tournament.getDate());
        t.setStarttime(tournament.getStarttime());
        t.setFormat(tournament.getFormat());
        t.setPlayerIds(tournament.getPlayerIds());
        t.setLeagueId(tournament.getLeagueId());
        t.setDate(tournament.getDate());

        Set<Player> players = tournamentService.getPlayerObjectsFromIds(t.getPlayerIds());
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
        t.setPlayerIds(tournament.getPlayerIds());
        t.setRankedPlayers(tournament.getRankedPlayers());
        t.setLeagueId(tournament.getLeagueId());
        t.setArchived(tournament.getArchived());
        t.setDate(tournament.getDate());

        Set<Player> players = tournamentService.getPlayerObjectsFromIds(t.getPlayerIds());
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

}
