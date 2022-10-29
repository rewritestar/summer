package TheFoodProject.TheFood.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

@Setter
@Getter
public class StartTokenForm {
    private String token;
    private Integer expiration;
}
