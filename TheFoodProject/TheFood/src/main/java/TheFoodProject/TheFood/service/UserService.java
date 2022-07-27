package TheFoodProject.TheFood.service;

import TheFoodProject.TheFood.entity.Board;
import TheFoodProject.TheFood.entity.User;
import TheFoodProject.TheFood.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;


    //회원가입
    public void join(User user) {

        //빈칸입력 불가
        if(user.getUseremail().isBlank() || user.getUserid().isBlank() || user.getUsername().isBlank() || user.getUserpassword().isBlank())  {
                throw new IllegalStateException("다 작성하셔야합니다");
            }

        //중복회원가입 불가
        Optional<User> result1 = userRepository.findByuseremail(user.getUseremail());
        result1.ifPresent(u -> {
            throw new IllegalStateException("이미 존재하는 회원입니다");
        });


        userRepository.save(user);
    }
//--------------------------------------------------------------------------------------------------
    //아이디,비밀번호 찾기
    public String findid(String useremail){
        Optional<User> result = userRepository.findByuseremail(useremail); //입력한 이메일을 가진 회원찾기
        if(result.isEmpty()){ //만약 일치하는 회원이 없다면
            throw new IllegalStateException("해당 아이디는 존재하지 않습니다.");
        }
        System.out.println(result.get().getUserid());
        return result.get().getUserid();
    }

    public String findpassword(String useremail, String userid){
        Optional<User> person1 = userRepository.findByuseremail(useremail);
        Optional<User> person2 = userRepository.findByuserid(userid);
        //만약 일치하는 회원이 없다면
        if(person1.isEmpty() || person2.isEmpty()){
            throw new IllegalStateException("해당하는 회원이 존재하지 않습니다.");
        }
        //입력한 이메일, 아이디 두개 다 일치하는 회원인지 확인
        if (person2.equals(person1)) {
            System.out.println(person2.get().getUserpassword());
        }
        else {System.out.println("해당하는 회원이 존재하지 않습니다");}

        return person2.get().getUserpassword();
    }
//--------------------------------------------------------------------------------------------------
    //로그인
    public void login(String userid, String userpassword){
        Optional<User> people1 = userRepository.findByuserpassword(userpassword);
        Optional<User> people2 = userRepository.findByuserid(userid);

        if(people1.isEmpty() || people2.isEmpty()){
            throw new IllegalStateException("해당하는 회원이 존재하지 않습니다.");
        }
        //입력한 아이디, 비번을 가진 회원인지 확인
        if (people2.equals(people1)) {
            System.out.println(people2.get().getUsername() + "님 환영합니다");
        }
        else {System.out.println("해당하는 회원이 존재하지 않습니다");}
    }

//--------------------------------------------------------------------------------------------------
    //마이페이지
    public User userdata(Integer id) { //해당 고유 식별자를 가진 회원에 대한 정보 불러오기

        return userRepository.findById(id).get();
    }

    public void updatejoin(User user) { //마이페이지에서 수정한 정보로 가지고 있는 데이터 업데이트

       if(user.getUseremail().isBlank() || user.getUserid().isBlank() || user.getUsername().isBlank() || user.getUserpassword().isBlank())  {
            throw new IllegalStateException("다 작성하셔야합니다");
        }
        userRepository.save(user);
    }

}

