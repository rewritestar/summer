package TheFoodProject.TheFood.DTO;

import TheFoodProject.TheFood.entity.User;
import lombok.Getter;

import java.io.Serializable;

@Getter
public class UserSessionDto implements Serializable {

    private Integer id;

    private String userid;

    private String useremail;

    private String userpassword;

    private String username;

    private boolean enabled;

    private String modifiedDate;

    /* Entity -> dto */
    public UserSessionDto(User user) {
        this.id = user.getId();
        this.userid = user.getUserid();
        this.useremail = user.getUseremail();
        this.userpassword = user.getUserpassword();
        this.username = user.getUsername();
        this.modifiedDate = user.getModifiedDate();    }

}
