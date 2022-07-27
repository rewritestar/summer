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

    public void join(User user) {

//        Optional<User> result = userRepository.findByid(user.getId());
//        result.ifPresent(u -> {
//            if(user.getUseremail().isBlank() || user.getUserid().isBlank() || user.getUsername().isBlank() || user.getUserpassword().isBlank())  {
//                throw new IllegalStateException("다 작성하셔야합니다");
//            }
//        });

        if(user.getUseremail().isBlank() || user.getUserid().isBlank() || user.getUsername().isBlank() || user.getUserpassword().isBlank())  {
                throw new IllegalStateException("다 작성하셔야합니다");
            }


        Optional<User> result1 = userRepository.findByuseremail(user.getUseremail());
        result1.ifPresent(u -> {
            throw new IllegalStateException("이미 존재하는 회원입니다");
        });


        userRepository.save(user);
    }

//    public List<User> userList(){
//        return userRepository.findAll();
//    }

}

