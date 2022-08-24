package TheFoodProject.TheFood.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)


    private Integer id;

    private Integer category;

    private String title;

    private String content;

    private String filename;

    private String filepath;


    //recipe 부분
//    @ManyToOne
//    @JoinTable(
//            name = "recipeboard",
//            joinColumns = @JoinColumn(name = "recipeid"))
//
//    private List<Recipeboard> recipeboards = new ArrayList<>();

    //user 정부
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;


}
