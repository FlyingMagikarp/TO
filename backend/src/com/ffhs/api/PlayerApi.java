package com.ffhs.api;

import com.ffhs.controller.PlayerService;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class PlayerApi {

    private PlayerService playerService = new PlayerService();

    @PutMapping("/player")
    public void saveNewPlayer(@RequestParam(value = "tag", defaultValue = "dummy") String tag) {
        playerService.writeNewPlayerToDB(tag);
    }
}
