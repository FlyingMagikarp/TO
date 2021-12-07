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
        int id = 1;
        Optional<Tournament> tournament = tournamentApi.getSingleTournamentById(id);
        assertThat(tournament).isNotNull();
    }

    @Test
    void testManyToMany(){
        Player p1 = new Player();
        p1.setTag("Player 1");
        p1.setGuid("39f8c82b-79cf-4afb-a435-b9bd79ee5ad1");

        Player p2 = new Player();
        p2.setTag("Player 2");
        p2.setGuid("39f8c82b-79cf-4afb-a435-b9bd79ee5ad2");

        Set<Player> players = new HashSet<>();
        players.add(p1);
        players.add(p2);

        Tournament t = new Tournament();
        t.setName("unit tourney");
        t.setLocation("Bern");
        t.setDate(new Date());
        t.setStarttime("12:00");
        t.setFormat("Round Robin");
        t.setPlayers(players);

        //tournamentApi.addNewTournament(t);
    }

    @Test
    void testRanking(){
        ArrayList<PlayerRanking> pr = tournamentService.getRoundRobinRanking(38);
    }

    @Test
    void testSingleElim(){
        //ArrayList<Game> games = tournamentService.getFirstRoundSingleEliminationGames(279);
        ArrayList<Game> games = tournamentService.getFirstRoundSingleEliminationGames(280);
        System.out.println("");
    }

}