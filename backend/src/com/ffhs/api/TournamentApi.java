package com.ffhs.api;

import com.ffhs.model.Tournament;
import com.ffhs.repository.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/tournament")
public class TournamentApi {
    @Autowired
    private TournamentRepository tournamentRepository;

    @PostMapping(path="/add", consumes = "application/json")
    public @ResponseBody java.lang.String addNewTournament(@RequestBody Tournament tournament){
        Tournament t = new Tournament();
        t.setLocation(tournament.getLocation());
        t.setName(tournament.getName());
        t.setDate(tournament.getDate());
        t.setStarttime(tournament.getStarttime());
        t.setFormat(tournament.getFormat());
        t.setPlayers(tournament.getPlayers());
        t.setLeagueId(tournament.getLeagueId());
        tournamentRepository.save(t);

        return "Tournament saved";
    }

    @PostMapping(path="/update", consumes = "application/json")
    public @ResponseBody java.lang.String updateTournament(@RequestBody Tournament tournament){
        Tournament t = new Tournament();
        t.setTournamentId(tournament.getTournamentId());
        t.setLocation(tournament.getLocation());
        t.setName(tournament.getName());
        t.setDate(tournament.getDate());
        t.setStarttime(tournament.getStarttime());
        t.setFormat(tournament.getFormat());
        t.setPlayers(tournament.getPlayers());
        t.setRankedPlayer(tournament.getRankedPlayer());
        t.setLeagueId(tournament.getLeagueId());
        t.setArchived(tournament.getArchived());
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
