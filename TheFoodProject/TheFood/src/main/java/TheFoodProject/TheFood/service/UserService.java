package TheFoodProject.TheFood.service;

import TheFoodProject.TheFood.Controller.MailUtil;
import TheFoodProject.TheFood.entity.Board;
import TheFoodProject.TheFood.entity.Comment;
import TheFoodProject.TheFood.entity.User;
import TheFoodProject.TheFood.repository.BoardRepository;
import TheFoodProject.TheFood.repository.CommentRepository;
import TheFoodProject.TheFood.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@Slf4j
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private SecurityService securityService;


    //회원가입
    public User save(User user) {

        //중복회원가입 불가
        User result1 = userRepository.findByUseremail(user.getUseremail());
        if(result1 != null) {
//            System.out.println("이미 존재하는 회원입니다22");
            throw new IllegalStateException("이미 존재하는 회원입니다");
        };
        //비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(user.getUserpassword());
        user.setUserpassword(encodedPassword);

        return userRepository.save(user);
    }
//--------------------------------------------------------------------------------------------------
    //아이디,비밀번호 찾기
//    public String findid(String useremail){
//        User result = userRepository.findByUseremail(useremail); //입력한 이메일을 가진 회원찾기
//        log.info(useremail + "useremail");
//        if(result != null){
//            log.info(result.getUserid() + "userid 찾음!");
//            return result.getUserid();
//        }else{
//            log.info("userid 못찾음");
//            return null;
//        }
//
//    }

//    public String findpassword(String useremail, String userid){
//        Optional<User> person1 = userRepository.findByuseremail(useremail);
//        Optional<User> person2 = userRepository.findByuserid(userid);
//        //만약 일치하는 회원이 없다면
//        if(person1.isEmpty() || person2.isEmpty()){
//            throw new IllegalStateException("해당하는 회원이 존재하지 않습니다.");
//        }
//        //입력한 이메일, 아이디 두개 다 일치하는 회원인지 확인
//        if (person2.equals(person1)) {
//            System.out.println(person2.get().getUserpassword());
//        }
//        else {System.out.println("해당하는 회원이 존재하지 않습니다");}
//
//        return person2.get().getUserpassword();
//    }

//    @Override
    public void findPw(String useremail) throws Exception{
        log.info(useremail);
        User result = userRepository.findByUseremail(useremail); //입력한 이메일을 가진 회원찾기
        log.info("여기는 result");
        log.info(result.getUsername());
        if(result == null) {
            throw new IllegalStateException("해당 이메일을 가진 사용자가 존재하지 않습니다.");
        };

        String tempPw = "";
        for (int i =0; i<12; i++){
            tempPw += (char)((Math.random() *26) + 97);
        }
        MailUtil mailUtil = new MailUtil();
        mailUtil.sendMail(useremail, tempPw);

        //임시 비번 저장
        String encodedPassword = passwordEncoder.encode(tempPw);
        result.setUserpassword(encodedPassword);

//        throw new Exception("에러가 발생하였습니다");
    }
//--------------------------------------------------------------------------------------------------
    //로그인
    public String login(String useremail, String userpassword){
        User people = userRepository.findByUseremail(useremail);

        if(people == null){
//            System.out.println("해당하는 회원이 존재하지 않습니다.22");
            throw new IllegalStateException("해당 이메일을 가진 회원이 존재하지 않습니다.");
        }
//        입력한 아이디, 비번을 가진 회원인지 확인
        if(passwordEncoder.matches(userpassword, people.getUserpassword()))
        {
            String token = securityService.createToken(useremail) ;
            System.out.println("토큰은 " + token);
//            System.out.println("토큰이 유효한가요?" + securityService.validateToken(token));
//            System.out.println("user : " + securityService.getUser(token));

            return token;
        }
        else{
            throw new IllegalStateException("비밀번호가 일치하지 않습니다.");
        }
    }
    //--------------------------------------------------------------------------------------------------
    //회원탈퇴
    @Transactional
    public void delete(Integer id) {
        userRepository.deleteById(id);
        //보드이름변경
        List<Board> newboard = boardRepository.findByuserid(id);
        for(int i=0; i< newboard.size(); i++){
            newboard.get(i).setUsername("알 수 없음");
            newboard.get(i).setUserid(-1);
        }
        //댓글변경
        List<Comment> newcomment = commentRepository.findByuserid(id);
        for(int i=0; i< newcomment.size(); i++){
            newcomment.get(i).setUsername("알 수 없음");
            newcomment.get(i).setUserid(-1);
        }
    }

    //마이페이지/회원정보수정
    public User mypage(Integer id, String username, String userpassword){
        Optional<User> people = userRepository.findById(id);
       people.ifPresent((u)->{
           u.setUsername(username);
           String encodedPassword = passwordEncoder.encode(userpassword);
           u.setUserpassword(encodedPassword);
           userRepository.save(u);
       });

        //바뀐 닉네임 보드와 댓글에도 적용되도록
        //보드
        List<Board> newboard = boardRepository.findByuserid(id);
        for(int i=0; i< newboard.size(); i++){
            newboard.get(i).setUsername(username);
            boardRepository.save(newboard.get(i));
        }
        //댓글
        List<Comment> newcomment = commentRepository.findByuserid(id);
        for(int i=0; i< newcomment.size(); i++){
            newcomment.get(i).setUsername(username);
            commentRepository.save(newcomment.get(i));
        }

        return people.get();
    }

    //로그인 유지
//    public User stay(Integer id){
//        Optional<User> user = userRepository.findById(id);
//        return user.get();
//    }
}

