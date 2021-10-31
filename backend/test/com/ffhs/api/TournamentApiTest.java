package com.ffhs.api;

import com.ffhs.model.Tournament;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TournamentApiTest {
    @Autowired
    private TournamentApi tournamentApi;

    @Test
    void contextLoads(){
        assertThat(tournamentApi).isNotNull();
    }

    @Test
    void addNewTournament() {
        ArrayList<String> players = new ArrayList<String>();
        players.add("39f8c82b-79cf-4afb-a435-b9bd79ee5ad7");
        players.add("4bda233d-6b63-49c4-be3e-dd4732b01337");
        String returnVal = tournamentApi.addNewTournament(
                "Bern",
                "Unit League",
                new Date(),
                "12:00",
                "Double Elimination",
                players,
                1
        );
        assertEquals("Tournament saved", returnVal);
    }

    @Test
    void getAllTournaments() {
        Iterable<Tournament> tournaments = tournamentApi.getAllTournaments();
        assertThat(tournaments).isNotNull();
    }

    @Test
    void getSingleTournamentById() {
        int id = 1;
        Optional<Tournament> tournament = tournamentApi.getSingleTournamentById(id);
        assertThat(tournament).isNotNull();
    }
}