package com.ffhs.services;

import com.ffhs.model.Player;
import com.ffhs.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PlayerService {
    @Autowired
    private PlayerRepository playerRepository;

    public Optional<Player> getPlayerObjectById(String guid){
        return playerRepository.findById(guid);
    }
}
