package com.ffhs.api;

import com.ffhs.model.Player;
import com.ffhs.model.PlayerDto;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;


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
        PlayerDto player = new PlayerDto();
        player.setGuid("dummy");
        player.setTag("dummy");
        String returnVal = playerApi.addNewPlayer(player);
        //assertEquals("Player saved", returnVal);
    }

    @Test
    void getAllPlayers() {
        Iterable<Player> players = playerApi.getAllPlayers();
        assertThat(players).isNotNull();
    }

    @Test
    void getSinglePlayerById(){
        String guid = "149c902b-7c8d-4ce7-b807-df09c1f94799";
        Optional<Player> player = playerApi.getSinglePlayerById(guid);
        assertThat(player).isNotNull();
    }


}