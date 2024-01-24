package LorenzoBaldassari.Playstore.Payloads.Videogames;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RequestVideogamesDTO(
        @Size(min=3,message="nome  troppo corto")
        @NotNull(message="il campo non deve essere null")
        String name,
        @Size(min=3,message="descritpion troppo corto")
        @NotNull(message="il campo non deve essere null")
        String description,
        @Size(min=3,message="brand  troppo corto")
        @Size(max=20,message="brand  troppo lungo")
        @NotNull(message="il campo non deve essere null")
        String brand,

        @NotNull(message="il campo non deve essere null")
        String imageUrl,

        @NotNull
        double price

) {
}
