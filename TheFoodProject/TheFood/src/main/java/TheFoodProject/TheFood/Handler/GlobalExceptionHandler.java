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
        return "<h1>" + e.getMessage() + "</h1>";
    }


    @ExceptionHandler(value=JwtException.class)
    public String jwtException(JwtException e){
        return "<h1>" + e.getMessage() + "</h1>";
    }
}
