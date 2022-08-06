package TheFoodProject.TheFood.Controller;

import TheFoodProject.TheFood.entity.User;
import TheFoodProject.TheFood.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class UserController {

    @Autowired
    private UserService userService;


    //회원가입
    @GetMapping("/user/join")
    public String userJoinForm(){
        return "userjoin";
    }

    @PostMapping("user/joinpro")
    public String userJoinPro(User user){
    userService.join(user);
    return "redirect:/board/list";
    }
//--------------------------------------------------------------------------------------------------
    //아이디,비밀번호 찾기
    @GetMapping("/user/findid")
    public String userFindIdForm(){
        return "userfindid";
    }

    @PostMapping("user/findidpro")
    public String userFindIdPro(String useremail){
        userService.findid(useremail);
        return "redirect:/user/login";
    }

    @GetMapping("/user/findpassword")
    public String userFindPasswordForm(){
        return "userfindpassword";
    }

    @PostMapping("user/findpasswordpro")
    public String userFindPasswordPro(String useremail, String userid){
        userService.findpassword(useremail, userid);
        return "redirect:/user/login";
    }

//--------------------------------------------------------------------------------------------------
    //로그인
    @GetMapping("/user/login")
    public String userLoginForm(){
        return "userlogin";
    }

    @PostMapping("user/loginpro")
    public String userLoginPro(String userid, String userpassword){
        userService.login(userid, userpassword);
        return "redirect:/board/list";
    }
//--------------------------------------------------------------------------------------------------
    //마이페이지
    @GetMapping("/user/modify/{id}")
    public String userModify(@PathVariable("id") Integer id, Model model) {
        model.addAttribute("user", userService.userdata(id));
        return "usermodify";
    }

    @PostMapping("/user/update/{id}")
    public String userUpdate(@PathVariable("id") Integer id, User user) throws Exception{

        User userTemp = userService.userdata(id);
        userTemp.setUsername(user.getUsername());
        userTemp.setUserpassword(user.getUserpassword());

        userService.updatejoin(userTemp);

        return "redirect:/user/login";
    }



}
