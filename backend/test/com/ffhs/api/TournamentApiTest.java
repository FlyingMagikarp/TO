package com.ffhs.api;

import com.ffhs.model.*;
import com.ffhs.repository.TournamentRepository;
import com.ffhs.services.TournamentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TournamentApiTest {
    @Autowired
    private TournamentApi tournamentApi;
    @Autowired
    private TournamentRepository tournamentRepository;
    @Autowired
    private TournamentService tournamentService;

    @Test
    void contextLoads(){
        assertThat(tournamentApi).isNotNull();
    }

    @Test
    void addNewTournament() {
        ArrayList<String> players = new ArrayList<String>();
        players.add("39f8c82b-79cf-4afb-a435-b9bd79ee5ad7");
        players.add("4bda233d-6b63-49c4-be3e-dd4732b01337");
        TournamentDto t = new TournamentDto();
        t.setName("unit tourney");
        t.setLocation("Bern");
        t.setDate(new Date());
        t.setStarttime("12:00");
        t.setFormat("Round Robin");
        t.setLeagueId(1);

        t.setPlayerIds(players);

        String returnVal = tournamentApi.addNewTournament(t);
        assertEquals("Tournament saved", returnVal);
    }

    @Test
    void getAllTournaments() {
        Iterable<Tournament> tournaments = tournamentApi.getAllTournaments();
        assertThat(tournaments).isNotNull();
    }

    @Test
    void getSingleTournamentById() {
        int id = 38;
        Optional<Tournament> tournament = tournamentApi.getSingleTournamentById(id);
        assertThat(tournament).isNotNull();
    }

    @Test
    void getMatchesForRoundRobin() {
        int id = 38;
        int expectedGameCount = 28;
        ArrayList<Game> games = tournamentService.getRoundRobinGames(id);
        assertThat(games).isNotNull();
        assertEquals(games.size(), expectedGameCount);
    }

    @Test
    void getRoundRobinPlayerRanking(){
        int id = 38;
        int expectedSize = 8;
        int expectedTopScore = 13;
        ArrayList<PlayerRanking> pr = tournamentService.getRoundRobinRanking(id);
        assertThat(pr).isNotNull();
        assertEquals(pr.size(), expectedSize);
        assertEquals(pr.get(0).getScore(), expectedTopScore);
    }

    @Test
    void getMatchesForSingleElimination() {
        int id = 280;
        int expectedGameCount = 7;
        ArrayList<Game> games = tournamentService.getSingleEliminationGames(id);
        assertThat(games).isNotNull();
        assertEquals(games.size(), expectedGameCount);
    }

    @Test
    void getRoundRobinPlayerRankingWithSingleElimTournament(){
        int id = 280;
        int expectedSize = 8;
        String expectedTopTag = "player1";
        ArrayList<PlayerRanking> pr = tournamentService.getRoundRobinRanking(id);
        assertThat(pr).isNotNull();
        assertEquals(pr.size(), expectedSize);
        assertEquals(pr.get(0).getPlayer().getTag(), expectedTopTag);
    }

}