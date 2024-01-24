package LorenzoBaldassari.Playstore.Exceptions;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter

public class ErrorPayload {

    private String Message;
    List<String> errorList;

    public ErrorPayload(String message) {
        Message = message;
    }

    public ErrorPayload(String message, List<String> errorList) {
        Message = message;
        this.errorList = errorList;
    }
}
