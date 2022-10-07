package TheFoodProject.TheFood.Handler;

import io.jsonwebtoken.JwtException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@ControllerAdvice
@RestController
public class GlobalExceptionHandler {

    @ExceptionHandler(value=IllegalStateException.class)
    public String handleArgumentException(IllegalStateException e){
        return e.getMessage();
    }


    @ExceptionHandler(value=JwtException.class)
    public String jwtException(JwtException e){
        return e.getMessage();
    }
}
