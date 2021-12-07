package com.ffhs.api;

import com.ffhs.model.Player;
import com.ffhs.model.PlayerDto;
import com.ffhs.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * REST endpoint for players
 */
@Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/player")
public class PlayerApi {
    /**
     * Data Repository for player object
     */
    @Autowired
    private PlayerRepository playerRepository;

    /**
     * Take a player object as parameter and persists it
     * @param player player model object
     * @return String success message
     */
    @PostMapping(path="/add", consumes = "application/json")
    public @ResponseBody java.lang.String addNewPlayer(@RequestBody PlayerDto player) {
        Player p = new Player();
        p.setTag(player.getTag());
        p.setArchived(player.getArchived());
        p.setGuid(java.util.UUID.randomUUID().toString());
        playerRepository.save(p);
        return "Player saved";
    }

    /**
     * Take a player object as parameter and updates it
     * @param player player model object
     * @return String success message
     */
    @PostMapping(path="/update", consumes = "application/json")
    public @ResponseBody java.lang.String updatePlayer(@RequestBody PlayerDto player) {
        Player p = new Player();
        p.setTag(player.getTag());
        p.setArchived(player.getArchived());
        p.setGuid(player.getGuid());
        playerRepository.save(p);
        return "Player updated";
    }

    /**
     * Returns all players
     * @return Iterable&lt;Player&gt; list of all players
     */
    @GetMapping(path="/all")
    public @ResponseBody Iterable<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    /**
     * takes a playerId(guid) as parameter and returns the found player model object
     * @param guid String guid of the player
     * @return Optional&lt;Player&gt; player model object
     */
    @GetMapping(path="/getById")
    public @ResponseBody Optional<Player> getSinglePlayerById(@RequestParam String guid) {
        return playerRepository.findById(guid);
    }
}
