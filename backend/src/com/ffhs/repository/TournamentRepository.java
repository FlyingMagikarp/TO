package com.ffhs.repository;

import com.ffhs.model.Tournament;
import org.springframework.data.repository.CrudRepository;

public interface TournamentRepository extends CrudRepository<Tournament, Integer> {
}
