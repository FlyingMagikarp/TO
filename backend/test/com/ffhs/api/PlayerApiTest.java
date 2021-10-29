package com.ffhs.api;

import org.junit.jupiter.api.Test;
import com.ffhs.controller.PlayerService;


class PlayerApiTest {
    private PlayerService playerService = new PlayerService();

    @Test
    void saveNewPlayer() {
        String tag = "unitTest";
        playerService.writeNewPlayerToDB(tag);
    }
}