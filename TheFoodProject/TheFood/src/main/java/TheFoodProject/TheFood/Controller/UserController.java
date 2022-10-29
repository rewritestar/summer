package TheFoodProject.TheFood.Controller;

import TheFoodProject.TheFood.entity.*;
import TheFoodProject.TheFood.service.SecurityService;
import TheFoodProject.TheFood.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;


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
    //비밀번호 찾기
    @PostMapping("api/findpw")
    public boolean userFindPw(@RequestBody FindPwForm findPwForm) throws Exception {
        return userService.findPw(findPwForm.getUseremail());
    }
//--------------------------------------------------------------------------------------------------
    //로그인
    @PostMapping("api/login")
    public StartTokenForm userLogin(@RequestBody LoginForm loginForm) throws Exception {
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
    public Optional<User>mypage(@RequestBody MypageForm mypageForm){
        return userService.mypage(mypageForm.getId(), mypageForm.getUsername(), mypageForm.getUserpassword());
    }
//-----------------------------------------------------
    //토큰을 통해 유저 정보 주는 코드
    @PostMapping("/api/staylogin/")
    public TokenUser tokenUser(@RequestBody TokenForm tokenForm){
        return securityService.getUser(tokenForm.getToken());
    }

    //토큰 유효성 확인 코드
//    @PostMapping("/") => 이거 포스트매핑 잘못된 상태에서 주석처리 안하면 오류나네 나 한참 헤맸어...
//    public boolean validtoken(@RequestBody String token){
//        return securityService.validateToken(token);
//    }
    //
}


