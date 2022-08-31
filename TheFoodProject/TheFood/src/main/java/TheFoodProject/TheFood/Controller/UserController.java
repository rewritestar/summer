package TheFoodProject.TheFood.Controller;

import TheFoodProject.TheFood.entity.User;
import TheFoodProject.TheFood.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RequiredArgsConstructor
@RestController
public class UserController {

    @Autowired
    private UserService userService;


    //회원가입
    @GetMapping("/signup")
    public void userJoinForm(){
        return;
    }

    @PostMapping("/signup")
    public void usersignupForm(String userid, String userpassword, String useremail, String username){
        User user = new User();
        System.out.println("회원가입 axios 연결 성공"+ username);
        //userService.save(newUser);
        return;
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

//    @GetMapping("/user/findpassword")
//    public String userFindPasswordForm(){
//        return "userfindpassword";
//    }
//
//    @PostMapping("user/findpasswordpro")
//    public String userFindPasswordPro(String useremail, String userid){
//        userService.findpassword(useremail, userid);
//        return "redirect:/user/login";
//    }
//    @PostMapping("")
//    public String checkPw(String userpassword, HttpSession session) throws Exception {
//        String result = null;
//        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//
//        User dbuser = (User)session.getAttribute("login");
//
//        if(encoder.matches(userpassword, dbuser.getUserpassword())){
//            result = "pwConfirmOk";
//        }
//        else{
//            result = "pwConfirmNo";
//        }
//
//        return result;
//    }

//--------------------------------------------------------------------------------------------------
    //로그인
    @GetMapping("/user/login")
    public String userLoginForm(){
        return "userlogin";
    }

    @PostMapping("/login")
    public void userloginForm(String userid, String userpassword){
        System.out.println("로그인 axios 연결 성공");
        return;
    }

    @PostMapping("user/loginpro")
    public String userLoginPro(String userid, String userpassword){
        userService.login(userid, userpassword);
        return "redirect:/board/list";}

//--------------------------------------------------------------------------------------------------
//탈퇴
    @GetMapping("/user/delete")
    public String delete(User user, HttpSession session, Authentication authentication) throws Exception{

        String userid = authentication.getName();

        userService.delete(userid);

        session.invalidate();

        return "redirect:/board/list";
    }

//--------------------------------------------------------------------------------------------------
    //마이페이지

    @GetMapping("/user/modify")
    public String userModify(){
        return "usermodify";
    }

    @PostMapping("/user/modifypro")
    public String userUpdate(User user, Authentication authentication) throws Exception{

        String userid = authentication.getName();
        userService.modify(user, userid);

        return "redirect:/board/list";
    }


}
