package TheFoodProject.TheFood.service;

import TheFoodProject.TheFood.entity.User;
import TheFoodProject.TheFood.repository.BoardRepository;
import TheFoodProject.TheFood.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    //회원가입
    public User save(User user) {

        //중복회원가입 불가
        Optional<User> result1 = userRepository.findByuseremail(user.getUseremail());
        result1.ifPresent(u -> {
            throw new IllegalStateException("이미 존재하는 회원입니다");
        });

        String encodedPassword = passwordEncoder.encode(user.getUserpassword());
        user.setUserpassword(encodedPassword);

        return userRepository.save(user);
    }
//--------------------------------------------------------------------------------------------------
    //아이디,비밀번호 찾기
    public String findid(String useremail){
        Optional<User> result = userRepository.findByuseremail(useremail); //입력한 이메일을 가진 회원찾기
        return result.get().getUserid();
    }
//
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
//--------------------------------------------------------------------------------------------------
    //로그인
    public User login(String userid, String userpassword){
//        User people1 = userRepository.findByuserpassword(userpassword);
        User people2 = userRepository.findByuserid(userid);

//        if(people1 == null || people2 == null){
//            throw new IllegalStateException("해당하는 회원이 존재하지 않습니다.");
//        }
////        입력한 아이디, 비번을 가진 회원인지 확인
//        if(!people2.equals(people1)){
//            throw new IllegalStateException("해당하는 회원이 존재하지 않습니다.");
//        }

        return people2;
    }

    //--------------------------------------------------------------------------------------------------
    //마이페이지
    public User mypage(Integer id, String username, String userpassword){
        User people = userRepository.findByid(id);
        people.setUsername(username);
        String encodedPassword = passwordEncoder.encode(userpassword);
        people.setUserpassword(encodedPassword);
        userRepository.save(people);
        return people;
    }
//회원정보수정
    /*
    @Transactional
    public void modify(User user, String userid) {
        User result = userRepository.findByuserid(userid);
//        User persistance = userRepository.findById(user.getId()).orElseThrow(() ->
//                new IllegalArgumentException("해당 회원이 존재하지 않습니다."));
        String rawpassword = user.getUserpassword();
        String encpassword = passwordEncoder.encode(rawpassword);
        result.setUserpassword(encpassword);
        result.setUsername(user.getUsername());
    }
*/
//회원탈퇴
//    @Transactional
    public void delete(Integer id) {
        userRepository.deleteById(id);
    }

    //로그인 유지
    public User stay(Integer id){
        User user = userRepository.findByid(id);
        return user;
    }


}

