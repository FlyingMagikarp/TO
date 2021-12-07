package com.ffhs.repository;

import com.ffhs.model.Game;
import org.springframework.data.repository.CrudRepository;

/**
 * Data repository for Game model
 */
public interface GameRepository extends CrudRepository<Game, Integer> {
}
