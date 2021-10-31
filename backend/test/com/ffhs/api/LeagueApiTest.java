package com.ffhs.api;

import com.ffhs.model.League;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class LeagueApiTest {
    @Autowired
    private LeagueApi leagueApi;

    @Test
    void contextLoads(){
        assertThat(leagueApi).isNotNull();
    }

    @Test
    void addNewLeague() {
        String returnVal = leagueApi.addNewLeague(
                "Unit League",
                "Bern",
                "Super Smash Bros. Ultimate");

        assertEquals("League saved", returnVal);
    }

    @Test
    void getAllLeagues() {
        Iterable<League> leagues = leagueApi.getAllLeagues();
        assertThat(leagues).isNotNull();
    }

    @Test
    void getSingLeagueById() {
        int id = 1;
        Optional<League> league = leagueApi.getSingLeagueById(id);
        assertThat(league).isNotNull();
    }
}