package TheFoodProject.TheFood.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data

public class Recipeboard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer recipecategory;

    private String recipetitle;

    private String recipecontent;

    private String recipefilename;

    private String recipefilepath;

    @ManyToOne
    @JoinColumn(name = "user_id")

    private User user;
}
