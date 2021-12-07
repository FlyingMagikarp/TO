package com.ffhs.services;

import com.ffhs.model.Player;
import com.ffhs.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service for Player
 */
@Service
public class PlayerService {
    /**
     * Data repository for player
     */
    @Autowired
    private PlayerRepository playerRepository;

    /**
     * Takes a player guid as parameter and returns the found player model object
     * @param guid String guid of a player
     * @return Optional&lt;Player&gt; Player model object
     */
    public Optional<Player> getPlayerObjectById(String guid){
        return playerRepository.findById(guid);
    }
}
