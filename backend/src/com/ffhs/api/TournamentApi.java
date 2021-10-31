package com.ffhs.api;

import com.ffhs.model.Tournament;
import com.ffhs.repository.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

@Controller
@RequestMapping(path="/tournament")
public class TournamentApi {
    @Autowired
    private TournamentRepository tournamentRepository;

    @PostMapping(path="/add")
    public @ResponseBody java.lang.String addNewTournament(@RequestParam
                                                           String loc,
                                                           String name,
                                                           Date date,
                                                           String starttime,
                                                           String format,
                                                           ArrayList<String> players,
                                                           int leagueId){
        Tournament t = new Tournament();
        t.setLocation(loc);
        t.setName(name);
        t.setDate(date);
        t.setStarttime(starttime);
        t.setFormat(format);
        t.setPlayers(players);
        t.setLeagueId(leagueId);
        tournamentRepository.save(t);
        return "Tournament saved";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Tournament> getAllTournaments(){
        return tournamentRepository.findAll();
    }

    @GetMapping(path="/")
    public @ResponseBody Optional<Tournament> getSingleTournamentById(@RequestParam int id){
        return tournamentRepository.findById(id);
    }
}
