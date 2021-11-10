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
        League l = new League();
        l.setName("Unit League");
        l.setSport("Super Smash Bros. Ultimate");
        l.setLocation("Bern");
        String returnVal = leagueApi.addNewLeague(l);

        assertEquals("League saved", returnVal);
    }

    @Test
    void getAllLeagues() {
        Iterable<League> leagues = leagueApi.getAllLeagues();
        assertThat(leagues).isNotNull();
    }

    @Test
    void getSingleLeagueById() {
        int id = 1;
        Optional<League> league = leagueApi.getSingleLeagueById(id);
        assertThat(league).isNotNull();
    }
}