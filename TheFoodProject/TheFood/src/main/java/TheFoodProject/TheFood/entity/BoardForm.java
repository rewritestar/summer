package TheFoodProject.TheFood.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardForm {

    private Integer id;

    private Integer category;

    private String title;

    private String content;

    private String filename;

    private String filepath;

    private Integer userid;

    private String username;
}
