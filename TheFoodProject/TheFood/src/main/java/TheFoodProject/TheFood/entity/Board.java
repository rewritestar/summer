package TheFoodProject.TheFood.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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

    private String username;


    //recipe 부분
//    @ManyToOne
//    @JoinTable(
//            name = "recipeboard",
//            joinColumns = @JoinColumn(name = "recipeid"))
//
//    private List<Recipeboard> recipeboards = new ArrayList<>();


    private Integer userid;

//    @JsonIgnore
//    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Comment> commentList;


}
