package com.ffhs.api;

import com.ffhs.model.League;
import com.ffhs.model.PlayerRanking;
import com.ffhs.repository.LeagueRepository;
import com.ffhs.services.LeagueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

/**
 * REST endpoint for leagues
 */
@Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/league")
public class LeagueApi {
    /**
     * Data Repository for league object
     */
    @Autowired
    private LeagueRepository leagueRepository;
    /**
     * Service for leagues
     */
    @Autowired
    private LeagueService leagueService;

    /**
     * Takes a league object as parameter and persists it
     * @param league league model object
     * @return String success message
     */
    @PostMapping(path="/add", consumes = "application/json")
    public @ResponseBody java.lang.String addNewLeague(@RequestBody League league){
        League l = new League();
        l.setName(league.getName());
        l.setSport(league.getSport());
        l.setLocation(league.getLocation());
        leagueRepository.save(l);

        return "League saved";
    }

    /**
     * Takes a league object as parameter and updates it
     * @param league league model object
     * @return String success message
     */
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

    /**
     * Returns all leagues
     * @return Iterable&lt;League&gt; list of all leagues
     */
    @GetMapping(path="/all")
    public @ResponseBody Iterable<League> getAllLeagues(){
        return leagueRepository.findAll();
    }

    /**
     * takes a leagueId as parameter and returns the found league model object
     * @param league_id int id of the league
     * @return Optional&lt;League&gt; league model object
     */
    @GetMapping(path="/getById")
    public @ResponseBody Optional<League> getSingleLeagueById(@RequestParam int league_id){
        return leagueRepository.findById(league_id);
    }

    /**
     * takes a leagueId and two dates as parameter and returns the ranking of a league
     * for all tournaments in that timeframe
     * @param league_id int id of the league
     * @param fromDate Date
     * @param toDate Date
     * @return ArrayList&lt;PlayerRanking&gt; Sorted list of players with their corresponding score
     */
    @GetMapping(path="/getLeagueRanking")
    public @ResponseBody ArrayList<PlayerRanking> getLeagueRanking(@RequestParam int league_id,
                                                                   @RequestParam @DateTimeFormat(pattern="yyyy-MM-dd") Date fromDate,
                                                                   @RequestParam @DateTimeFormat(pattern="yyyy-MM-dd") Date toDate){
        return leagueService.getLeagueRanking(league_id, fromDate, toDate);
    }

}

