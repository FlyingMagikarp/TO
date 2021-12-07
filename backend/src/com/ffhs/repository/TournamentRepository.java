package com.ffhs.repository;

import com.ffhs.model.Tournament;
import org.springframework.data.repository.CrudRepository;

/**
 * Data repository for Tournament model
 */
public interface TournamentRepository extends CrudRepository<Tournament, Integer> {
}
