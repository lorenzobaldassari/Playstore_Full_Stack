package LorenzoBaldassari.Playstore.Dao;

import LorenzoBaldassari.Playstore.Entities.Videogames;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface VideogamesDao extends JpaRepository<Videogames,UUID> {
}
