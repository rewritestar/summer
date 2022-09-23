package TheFoodProject.TheFood.entity;

        import lombok.Getter;
        import lombok.Setter;

@Getter
@Setter
public class CommentForm {
    private Integer userid;
    private String content;
    private Integer boardid;
    private String username;
}
