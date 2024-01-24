package LorenzoBaldassari.Playstore.Controller;

import LorenzoBaldassari.Playstore.Entities.Videogames;
import LorenzoBaldassari.Playstore.Exceptions.BadRequestException;
import LorenzoBaldassari.Playstore.Payloads.Videogames.RequestVideogamesDTO;
import LorenzoBaldassari.Playstore.Payloads.Videogames.RespondVideogamesDTO;
import LorenzoBaldassari.Playstore.Services.VideogamesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/videogames")
public class VideogamesController {

    @Autowired
    private VideogamesService videogamesService;

    @GetMapping("/")
    public List<Videogames> getVideogamesList(){
        return videogamesService.getAll();
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public RespondVideogamesDTO postVideogame(@RequestBody @Validated RequestVideogamesDTO body
    , BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            System.err.println(bindingResult.getAllErrors());
            throw new BadRequestException("errore nel invio del payload per il metodo POST"+bindingResult.getAllErrors());
        } else {
        return videogamesService.postVideogame(body);
    }
    }
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Videogames findById(@PathVariable UUID id){
        return videogamesService.findById(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id){
        videogamesService.delete(id);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public RespondVideogamesDTO modify(@RequestBody @Validated RequestVideogamesDTO body,
                                       @PathVariable UUID id,BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            System.err.println(bindingResult.getAllErrors());
            throw new BadRequestException("errore nel invio del payload per il metodo POST"+bindingResult.getAllErrors());
        } else {
            return videogamesService.modifyVideogame(id,body);
        }
    }

}
