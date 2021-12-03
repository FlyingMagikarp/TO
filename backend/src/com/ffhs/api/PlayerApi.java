package com.ffhs.api;

import com.ffhs.model.Player;
import com.ffhs.model.PlayerDto;
import com.ffhs.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/player")
public class PlayerApi {
    @Autowired
    private PlayerRepository playerRepository;

    @PostMapping(path="/add", consumes = "application/json")
    public @ResponseBody java.lang.String addNewPlayer(@RequestBody PlayerDto player) {
        Player p = new Player();
        p.setTag(player.getTag());
        p.setArchived(player.getArchived());
        p.setGuid(java.util.UUID.randomUUID().toString());
        playerRepository.save(p);
        return "Player saved";
    }

    @PostMapping(path="/update", consumes = "application/json")
    public @ResponseBody java.lang.String updatePlayer(@RequestBody PlayerDto player) {
        Player p = new Player();
        p.setTag(player.getTag());
        p.setArchived(player.getArchived());
        p.setGuid(player.getGuid());
        playerRepository.save(p);
        return "Player updated";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    @GetMapping(path="/getById")
    public @ResponseBody Optional<Player> getSinglePlayerById(@RequestParam String guid) {
        return playerRepository.findById(guid);
    }
}
