package com.ffhs.api;

import com.ffhs.model.League;
import com.ffhs.model.PlayerRanking;
import com.ffhs.services.LeagueService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class LeagueApiTest {
    @Autowired
    private LeagueApi leagueApi;
    @Autowired
    private LeagueService leagueService;

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

    @Test
    void getLeagueRanking(){
        int id = 8;
        int expectedSize = 8;
        String expectedTopTag = "player4";

        Date fromDate = new Date((long) 1609462800000.);
        Date toDate = new Date((long) 1640998800000.);
        ArrayList<PlayerRanking> pr = leagueService.getLeagueRanking(id, fromDate, toDate);
        assertThat(pr).isNotNull();
        assertEquals(pr.size(), expectedSize);
        assertEquals(pr.get(0).getPlayer().getTag(), expectedTopTag);
    }
}