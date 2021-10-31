package com.ffhs.api;

import com.ffhs.model.Game;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class GameApiTest {
    @Autowired
    private GameApi gameApi;

    @Test
    void contextLoad() {
        assertThat(gameApi).isNotNull();
    }

    @Test
    void addNewGame() {
        String returnVal = gameApi.addNewGame(
                1,
                "39f8c82b-79cf-4afb-a435-b9bd79ee5ad7",
                "4bda233d-6b63-49c4-be3e-dd4732b01337"
        );

        assertEquals("Game saved", returnVal);
    }

    @Test
    void getAllGames() {
        Iterable<Game> games = gameApi.getAllGames();
        assertThat(games).isNotNull();
    }

    @Test
    void getSingleGameById() {
        int id = 1;
        Optional<Game> game = gameApi.getSingleGameById(id);
        assertThat(game).isNotNull();
    }
}