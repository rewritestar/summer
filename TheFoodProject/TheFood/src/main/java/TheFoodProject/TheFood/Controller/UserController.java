package TheFoodProject.TheFood.Controller;

import TheFoodProject.TheFood.entity.LoginForm;
import TheFoodProject.TheFood.entity.MypageForm;
import TheFoodProject.TheFood.entity.SignupForm;
import TheFoodProject.TheFood.entity.User;
import TheFoodProject.TheFood.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    //회원가입
    @PostMapping("/api/signup")
    public User usersignupForm(@RequestBody SignupForm signupForm){
        User newUser = new User();
        newUser.setUserid(signupForm.getUserid());
        newUser.setUserpassword(signupForm.getUserpassword());
        newUser.setUseremail(signupForm.getUseremail());
        newUser.setUsername(signupForm.getUsername());
        return userService.save(newUser);
    }
//--------------------------------------------------------------------------------------------------
    //아이디,비밀번호 찾기
    @PostMapping("api/findid")
    public String userFindId(@RequestBody String useremail){

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
    @PostMapping("api/login")
    public User userLogin(@RequestBody LoginForm loginForm){

        return userService.login(loginForm.getUserid(), loginForm.getUserpassword());
    }

//--------------------------------------------------------------------------------------------------
//탈퇴
    @PostMapping("/api/withdrawal/")
    public void delete(@RequestBody Integer id){

        userService.delete(id);
    }

//--------------------------------------------------------------------------------------------------
    //마이페이지

    @PostMapping("/api/mypage")
    public User mypage(@RequestBody MypageForm mypageForm){

        return userService.mypage(mypageForm.getUsername(), mypageForm.getUserpassword());
    }

//    @PostMapping("/user/modifypro")
//    public String userUpdate(User user, Authentication authentication) throws Exception{
//
//        String userid = authentication.getName();
//        userService.modify(user, userid);
//
//        return "redirect:/board/list";
//    }
//-----------------------------------------------------
    //stay login
    @PostMapping("/api/staylogin/")
    public User userStay(@RequestBody Integer id){

        return userService.stay(id);
    }
}
