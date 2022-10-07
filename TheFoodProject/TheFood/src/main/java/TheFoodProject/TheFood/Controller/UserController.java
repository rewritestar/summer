package TheFoodProject.TheFood.Controller;

import TheFoodProject.TheFood.entity.*;
import TheFoodProject.TheFood.service.SecurityService;
import TheFoodProject.TheFood.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private SecurityService securityService;

    //회원가입
    @PostMapping("/api/signup")
    public User usersignupForm(@RequestBody SignupForm signupForm){
        User newUser = new User();
        newUser.setUserpassword(signupForm.getUserpassword());
        newUser.setUseremail(signupForm.getUseremail());
        newUser.setUsername(signupForm.getUsername());
        return userService.save(newUser);
    }
//--------------------------------------------------------------------------------------------------
    //아이디,비밀번호 찾기
//    @PostMapping("api/findid")
//    public String userFindId(@RequestBody FindIdForm findIdForm){
//        return userService.findid(findIdForm.getUseremail());
//    }

    @PostMapping("api/findpw")
    public void userFindPw(@RequestBody FindPwForm findPwForm) throws Exception {
        log.info("findpw java");
        log.info(findPwForm.getUseremail());
        userService.findPw(findPwForm.getUseremail());
    }
//--------------------------------------------------------------------------------------------------
    //로그인
    @PostMapping("api/login")
    public String userLogin(@RequestBody LoginForm loginForm) throws Exception {
        return userService.login(loginForm.getUseremail(), loginForm.getUserpassword());

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
        return userService.mypage(mypageForm.getId(), mypageForm.getUsername(), mypageForm.getUserpassword());
    }
//-----------------------------------------------------
    //로그인 유지
//    @PostMapping("/api/staylogin/")
//    public User userStay(@RequestBody Integer id){
//        return userService.stay(id);
//    }


    //토큰을 통해 유저 정보 주는 코드
    @PostMapping("/api/staylogin/")
    public User tokenUser(@RequestBody TokenForm tokenForm){
        return securityService.getUser(tokenForm.getToken());
    }

    //토큰 유효성 확인 코드
//    @PostMapping("/")
//    public boolean validtoken(@RequestBody String token){
//        return securityService.validateToken(token);
//    }
}


