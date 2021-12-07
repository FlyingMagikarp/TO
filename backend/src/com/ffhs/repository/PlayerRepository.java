package com.ffhs.repository;

import com.ffhs.model.Player;
import org.springframework.data.repository.CrudRepository;

/**
 * Data repository for Player model
 */
public interface PlayerRepository extends CrudRepository<Player, java.lang.String> {
}
