package TheFoodProject.TheFood.repository;

import TheFoodProject.TheFood.entity.Recipeboard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecipeboardRepository extends JpaRepository<Recipeboard, Integer>{

    Optional<Recipeboard> findByrecipecategory(Integer recipecategory);
}

