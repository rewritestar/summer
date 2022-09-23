package TheFoodProject.TheFood.repository;

import TheFoodProject.TheFood.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer>{
    List<Comment> findByboardid(Integer boardid);

}
