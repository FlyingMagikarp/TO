package com.ffhs.api;

import com.ffhs.model.Player;
import com.ffhs.repository.PlayerRepository;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class PlayerApiTest {
    @Autowired
    private PlayerApi playerApi;

    @Test
    void contextLoads() {
        assertThat(playerApi).isNotNull();
    }

    @Test
    void addNewPlayer() {
        //String returnVal = playerApi.addNewPlayer("Unit Test");
        //assertEquals("Player saved", returnVal);
    }

    @Test
    void getAllPlayers() {
        Iterable<Player> players = playerApi.getAllPlayers();
        assertThat(players).isNotNull();
    }

    @Test
    void getSinglePlayerById(){
        String guid = "39f8c82b-79cf-4afb-a435-b9bd79ee5ad7";
        Optional<Player> player = playerApi.getSinglePlayerById(guid);
        assertThat(player).isNotNull();
    }


}