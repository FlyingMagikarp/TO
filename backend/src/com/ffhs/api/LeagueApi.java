package com.ffhs.api;

import com.ffhs.model.League;
import com.ffhs.repository.LeagueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/league")
public class LeagueApi {
    @Autowired
    private LeagueRepository leagueRepository;

    @PostMapping(path="/add", consumes = "application/json")
    public @ResponseBody java.lang.String addNewLeague(@RequestBody League league){
        League l = new League();
        l.setName(league.getName());
        l.setSport(league.getSport());
        l.setLocation(league.getLocation());
        leagueRepository.save(l);

        return "League saved";
    }

    @PostMapping(path="/update", consumes = "application/json")
    public @ResponseBody java.lang.String updateLeague(@RequestBody League league){
        League l = new League();
        l.setName(league.getName());
        l.setSport(league.getSport());
        l.setLocation(league.getLocation());
        l.setArchived(league.getArchived());
        l.setLeague_id(league.getLeague_id());
        leagueRepository.save(l);

        return "League updated";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<League> getAllLeagues(){
        return leagueRepository.findAll();
    }

    @GetMapping(path="/getById")
    public @ResponseBody Optional<League> getSingleLeagueById(@RequestParam int league_id){
        return leagueRepository.findById(league_id);
    }

}

