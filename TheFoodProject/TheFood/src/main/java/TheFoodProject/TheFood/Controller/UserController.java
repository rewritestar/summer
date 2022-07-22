package TheFoodProject.TheFood.Controller;

import TheFoodProject.TheFood.entity.User;
import TheFoodProject.TheFood.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/user/join")
    public String userJoinForm(){
        return "userjoin";
    }

    @PostMapping("user/joinpro")
    public String userJoinPro(User user){
    userService.join(user);
    return "";
    }



}
