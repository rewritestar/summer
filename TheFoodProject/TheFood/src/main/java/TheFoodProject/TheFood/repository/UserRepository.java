package TheFoodProject.TheFood.repository;


import TheFoodProject.TheFood.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface UserRepository extends JpaRepository<User, Integer>{
    Optional<User> findByuseremail(String useremail);
//    Optional<User> findByuserpassword(String userpassword);
    User findByuserpassword(String userpassword);
    User findByusername(String username);

    User findByuserid(String userid);
//    Optional<User> findByuserid(String userid);
    User findByid(Integer id);
}
