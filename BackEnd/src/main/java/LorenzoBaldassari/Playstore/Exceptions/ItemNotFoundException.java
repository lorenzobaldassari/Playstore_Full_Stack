package LorenzoBaldassari.Playstore.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.UUID;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ItemNotFoundException extends RuntimeException{
    public ItemNotFoundException(UUID id){
        super("elemento " +id+ " non trovato");
    }
}
