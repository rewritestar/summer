package TheFoodProject.TheFood.Controller;

import TheFoodProject.TheFood.entity.User;
import TheFoodProject.TheFood.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/api/signup")
    public User usersignupForm(String userid, String userpassword, String useremail, String username){
        User newUser = new User();
        newUser.setUserid(userid);
        newUser.setUserpassword(userpassword);
        newUser.setUseremail(useremail);
        newUser.setUsername(username);
        return userService.save(newUser);
    }
//--------------------------------------------------------------------------------------------------
    //아이디,비밀번호 찾기
    @PostMapping("api/findid")
    public String userFindId(String useremail){
        return userService.findid(useremail);
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
//    @PostMapping("/api/login")
//    public LoginForm userloginForm(@RequestBody LoginForm loginForm){
//        System.out.println("로그인 axios 연결 성공" + loginForm);
//        return loginForm;
//    }

    @PostMapping("api/login")
    public User userLogin(String userid, String userpassword){

        return userService.login(userid, userpassword);
    }

//--------------------------------------------------------------------------------------------------
//탈퇴
    @PostMapping("/api/withdrawal/")
    public void delete(Integer id){
        userService.delete(id);
    }

//--------------------------------------------------------------------------------------------------
    //마이페이지

    @PostMapping("/api/mypage")
    public User mypage(String username, String userpassword){
        return userService.mypage(username, userpassword);
    }

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
//-----------------------------------------------------
    //stay login
    @PostMapping("/api/staylogin/")
    public User userStay(Integer id){
        return userService.stay(id);
    }
}
