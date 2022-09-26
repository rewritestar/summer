package TheFoodProject.TheFood.entity;

        import lombok.Getter;
        import lombok.Setter;

@Getter
@Setter
public class CommentForm {
    private Integer id;
    private String content;
    private Integer userid;
    private Integer boardid;
    private String username;
}
