package TheFoodProject.TheFood.Controller;

import TheFoodProject.TheFood.entity.User;
import TheFoodProject.TheFood.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;

@RequiredArgsConstructor
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
    userService.save(user);
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
    @PostMapping("")
    public String checkPw(@RequestBody String userpassword, HttpSession session) throws Exception {
        String result = null;
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        User dbuser = (User)session.getAttribute("login");

        if(encoder.matches(userpassword, dbuser.getUserpassword())){
            result = "pwConfirmOk";
        }
        else{
            result = "pwConfirmNo";
        }

        return result;
    }

//--------------------------------------------------------------------------------------------------
    //로그인
    @GetMapping("/user/login")
    public String userLoginForm(){
        return "userlogin";
    }

//    @PostMapping("user/loginpro")
//    public String userLoginPro(String userid, String userpassword){
//        userService.login(userid, userpassword);
//        return "redirect:/board/list";

//--------------------------------------------------------------------------------------------------
//탈퇴
//    @GetMapping("/user/delete")
//    public String userDelete(Integer id){
//
//        userService.userDelete(id);
//
//        return "/user/delete";
//    }

    @GetMapping("/user/delete")
    public ModelAndView remove(){
        return new ModelAndView("userdelete");
    }

    @PostMapping("/user/deletepro")
    public String delete(@RequestBody User user, HttpSession session) throws Exception{
        String result = checkPw(user.getUserpassword(), session);
        System.out.println("여기는 왔니");
        if(result.equals("pwConfirmOk")){
            userService.delete(user);
            Object object = session.getAttribute("login");
            if(object != null){
                session.removeAttribute("login");
                session.invalidate();
            }

            result = "Sucess";
        }

        else{
            result= "Fail";
        }
        return result;
    }

//--------------------------------------------------------------------------------------------------
    //마이페이지

//    @Transactional
//    public void usermodify(User user) {
//        User persistance = userRepository.findByid(user.getId());
//        String rawpassword = user.getUserpassword();
//        String encpassword = passwordEncoder.encode(rawpassword);
//        persistance.setUserpassword(encpassword);
//        persistance.setUsername(user.getUsername());
//
//    }
//    @GetMapping("/user/modify/{id}")
//    public String userModify(@PathVariable("id") Integer id, Model model) {
//        model.addAttribute("user", userService.userdata(id));
//        return "usermodify";
//    }
//
//    @PostMapping("/user/update/{id}")
//    public String userUpdate(@PathVariable("id") Integer id, User user) throws Exception{
//
//        User userTemp = userService.userdata(id);
//        userTemp.setUsername(user.getUsername());
//        userTemp.setUserpassword(user.getUserpassword());
//        userService.updatejoin(userTemp);
//        return "redirect:/user/login";
//    }

//    @GetMapping("/user/modify")
//    public String userModifyForm(){
//        return "userjoin";
//    }
//
//    @PostMapping("/user/modifypro")
//    public String userModifyPro(User user) {
//        userService.usermodify(user);
//        return "";
//    }

//    @GetMapping("/user/modify")
//    public String modify(@LoginUser UserSessionDto userDto, Model model) {
//        if (userDto != null) {
//            model.addAttribute("user", userDto.getUsername());
//            model.addAttribute("userDto", userDto);
//        }
//        return "/user/user-modify";
//    }


}
