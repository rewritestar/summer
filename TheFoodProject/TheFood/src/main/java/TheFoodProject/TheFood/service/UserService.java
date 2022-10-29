package TheFoodProject.TheFood.service;

import TheFoodProject.TheFood.entity.Board;
import TheFoodProject.TheFood.entity.Comment;
import TheFoodProject.TheFood.entity.StartTokenForm;
import TheFoodProject.TheFood.entity.User;
import TheFoodProject.TheFood.repository.BoardRepository;
import TheFoodProject.TheFood.repository.CommentRepository;
import TheFoodProject.TheFood.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
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


    private final JavaMailSender mailSender;
    @Value("${spring.mail.username}")
    private String sender;


    //회원가입
    public User save(User user) {

        //중복회원가입 불가
        User result1 = userRepository.findByUseremail(user.getUseremail());
        if(result1 != null) {
            throw new IllegalStateException();
        };
        //비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(user.getUserpassword());
        user.setUserpassword(encodedPassword);

        return userRepository.save(user);
    }
//--------------------------------------------------------------------------------------------------
    //비밀번호 찾기
    public boolean findPw(String useremail) throws Exception{
        User result = userRepository.findByUseremail(useremail); //입력한 이메일을 가진 회원찾기
        if(result == null) {
            throw new IllegalStateException();
        };

        //임시 비번 생성
        String tempPw = "";
        for (int i =0; i<12; i++){
            tempPw += (char)((Math.random() *26) + 97);
        }

        //메일 발송
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(useremail);
        message.setFrom(sender);
        message.setSubject("[The Food]" + result.getUsername() + "님의 임시 비밀번호 발급");
        message.setText("안녕하세요. \n" + result.getUsername() + "님의 [The Food] 임시비밀번호를 발급해드립니다. \n" + tempPw +
                "\n위 비밀번호로 로그인 후 마이페이지에서 새로운 비밀번호로 변경해주시길 바랍니다. 감사합니다.");
        mailSender.send(message);

        //임시 비번으로 저장
        String encodedPassword = passwordEncoder.encode(tempPw);
        result.setUserpassword(encodedPassword);
        userRepository.save(result);
        return true;
//        throw new Exception("에러가 발생하였습니다");
    }
//--------------------------------------------------------------------------------------------------
    //로그인
    public StartTokenForm login(String useremail, String userpassword){
        User people = userRepository.findByUseremail(useremail);

        if(people == null){
            throw new IllegalStateException();
        }

//        입력한 아이디, 비번을 가진 회원인지 확인
        if(passwordEncoder.matches(userpassword, people.getUserpassword()))
        {
            log.info("시큐리티 갔니");
            return securityService.createToken(useremail);
        }
        else{
            throw new IllegalStateException();
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
    public Optional<User> mypage(Integer id, String username, String userpassword){
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

        return people;
    }

}

