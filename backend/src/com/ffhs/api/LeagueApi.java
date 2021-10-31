package com.ffhs.api;

import com.ffhs.model.League;
import com.ffhs.repository.LeagueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping(path="/league")
public class LeagueApi {
    @Autowired
    private LeagueRepository leagueRepository;

    @PostMapping(path="/add")
    public @ResponseBody java.lang.String addNewLeague(@RequestParam String name, String loc, String sport){
        League l = new League();
        l.setName(name);
        l.setSport(sport);
        l.setLocation(loc);
        leagueRepository.save(l);
        return "League saved";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<League> getAllLeagues(){
        return leagueRepository.findAll();
    }

    @GetMapping(path="/")
    public @ResponseBody Optional<League> getSingleLeagueById(@RequestParam int id){
        return leagueRepository.findById(id);
    }

}
