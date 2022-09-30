package TheFoodProject.TheFood.repository;


import TheFoodProject.TheFood.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface UserRepository extends JpaRepository<User, Integer>{

    User findByUserid(String userid);
    Optional<User> findById(Integer id);
    User findByUseremail(String useremail);
}
