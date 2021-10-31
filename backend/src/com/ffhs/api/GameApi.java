package com.ffhs.api;

import com.ffhs.model.Game;
import com.ffhs.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping(path="/game")
public class GameApi {
    @Autowired
    private GameRepository gameRepository;

    @PostMapping(path="add")
    public @ResponseBody java.lang.String addNewGame(@RequestParam int tournamentId, String p1, String p2){
        Game g = new Game();
        g.setTournamentId(tournamentId);
        g.setPlayer1(p1);
        g.setPlayer2(p2);
        gameRepository.save(g);
        return "Game saved";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Game> getAllGames() {
        return gameRepository.findAll();
    }

    @GetMapping(path="/")
    public @ResponseBody Optional<Game> getSingleGameById(@RequestParam int id){
        return gameRepository.findById(id);
    }
}
