package com.ffhs.services;

import com.ffhs.model.Player;
import com.ffhs.repository.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class TournamentService {
    @Autowired
    private TournamentRepository tournamentRepository;
    @Autowired
    private PlayerService playerService;


    public Set<Player> getPlayerObjectsFromIds(ArrayList<String> playerIds){
        Set<Player> players = new HashSet<>();
        for(String pid : playerIds){
            Optional<Player> op = playerService.getPlayerObjectById(pid);
            op.ifPresent(players::add);
        }
        return players;
    }
}
