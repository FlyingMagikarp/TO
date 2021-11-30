package com.ffhs.repository;

import com.ffhs.model.Tournament;
import org.springframework.data.repository.CrudRepository;

public interface PlayerTournamentRepository extends CrudRepository<Tournament, Integer> {
}
