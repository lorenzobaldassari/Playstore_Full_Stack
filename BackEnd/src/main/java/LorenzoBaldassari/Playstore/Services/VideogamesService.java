package LorenzoBaldassari.Playstore.Services;

import LorenzoBaldassari.Playstore.Dao.VideogamesDao;
import LorenzoBaldassari.Playstore.Entities.Videogames;
import LorenzoBaldassari.Playstore.Exceptions.ItemNotFoundException;
import LorenzoBaldassari.Playstore.Payloads.Videogames.RequestVideogamesDTO;
import LorenzoBaldassari.Playstore.Payloads.Videogames.RespondVideogamesDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class VideogamesService {
    @Autowired
    private VideogamesDao videogamesDao;


    public List<Videogames> getAll(){
        return videogamesDao.findAll();
    }

    public RespondVideogamesDTO postVideogame(RequestVideogamesDTO body){
        Videogames videogame = new Videogames();
        videogame.setName(body.name());
        videogame.setPrice(body.price());
        videogame.setDescription(body.description());
        videogame.setBrand(body.brand());
        videogame.setImageUrl(body.imageUrl());
        videogamesDao.save(videogame);
        return new RespondVideogamesDTO(videogame.getId(),videogame.getName());
    }

    public Videogames findById(UUID id){
        return videogamesDao.findById(id).orElseThrow(()->new ItemNotFoundException(id));
    }

    public void delete (UUID id){
       videogamesDao.delete(this.findById(id));
    }

    public RespondVideogamesDTO modifyVideogame(UUID id , RequestVideogamesDTO body){
        Videogames videogame = this.findById(id);
        videogame.setName(body.name());
        videogame.setPrice(body.price());
        videogame.setDescription(body.description());
        videogame.setBrand(body.brand());
        videogamesDao.save(videogame);
        return new RespondVideogamesDTO(videogame.getId(),videogame.getName());
    }
}
