package TheFoodProject.TheFood.repository;

import TheFoodProject.TheFood.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<Board, Integer> {
    Optional<Board> findByid(Integer id);
}
