package com.ffhs.repository;

import com.ffhs.model.League;
import org.springframework.data.repository.CrudRepository;

/**
 * Data repository for League model
 */
public interface LeagueRepository extends CrudRepository<League, Integer> {
}
