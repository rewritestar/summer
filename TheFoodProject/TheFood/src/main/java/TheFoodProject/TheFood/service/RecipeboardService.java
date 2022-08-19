package TheFoodProject.TheFood.service;

import TheFoodProject.TheFood.entity.Recipeboard;
import TheFoodProject.TheFood.entity.User;
import TheFoodProject.TheFood.repository.RecipeboardRepository;
import TheFoodProject.TheFood.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.UUID;

@Service
public class RecipeboardService {
    @Autowired
    private RecipeboardRepository recipeboardRepository;
    @Autowired
    private UserRepository userRepository;
    //글 작성 처리
    public Recipeboard write(String username, Recipeboard recipeboard, MultipartFile file) throws Exception {

//        recipeboard.setRecipecategory(recipeboard.getRecipecategory());

        User findUser = userRepository.findByusername(username);
        recipeboard.setUser(findUser);

        String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\files";

        UUID uuid = UUID.randomUUID();

        String fileName = uuid + "_" + file.getOriginalFilename();

        File saveFile = new File(projectPath, fileName);

        file.transferTo(saveFile);

        recipeboard.setRecipefilename(fileName);
        recipeboard.setRecipefilepath("/files/" + fileName);

        return recipeboardRepository.save(recipeboard);
    }

    //게시글 리스트 처리
//    public Page<Board> boardList(Pageable pageable){
//
//        return boardRepository.findAll(pageable);
//    }



//    public List<Recipeboard> boardList(){
//
//        return recipeboardRepository.findAll();
//    }

    //특정 게시글 불러오기
//    public Recipeboard boardView(Integer id) {
//
//
//        return recipeboardRepository.findById(id).get();
//    }

    //시험
    public List<Recipeboard> boardList(){
        //test


        return recipeboardRepository.findAll();
    }
    public List<Recipeboard> boardList1(Integer recipecategory){

        return (List<Recipeboard>) recipeboardRepository.findByrecipecategory(recipecategory).get();
    }

    //특정 게시글 불러오기
    public Recipeboard boardView(Integer id) {


        return recipeboardRepository.findById(id).get();
    }

    //특정 게시글 삭제
    public void boardDelete(Integer id){

        recipeboardRepository.deleteById(id);
    }
}

