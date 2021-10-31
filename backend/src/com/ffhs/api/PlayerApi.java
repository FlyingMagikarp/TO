package com.ffhs.api;

import com.ffhs.model.Player;
import com.ffhs.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping(path="/player")
public class PlayerApi {
    @Autowired
    private PlayerRepository playerRepository;

    @PostMapping(path="/add")
    public @ResponseBody
    java.lang.String addNewPlayer(@RequestParam java.lang.String tag) {
        Player p = new Player();
        p.setTag(tag);
        p.setGuid(java.util.UUID.randomUUID().toString());
        playerRepository.save(p);
        return "Player saved";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    @GetMapping(path="/")
    public @ResponseBody Optional<Player> getSinglePlayerById(@RequestParam String guid) {
        return playerRepository.findById(guid);
    }
}
