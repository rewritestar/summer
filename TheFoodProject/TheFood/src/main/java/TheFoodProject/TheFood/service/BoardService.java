package TheFoodProject.TheFood.service;

import TheFoodProject.TheFood.entity.Board;
import TheFoodProject.TheFood.entity.User;
import TheFoodProject.TheFood.repository.BoardRepository;
import TheFoodProject.TheFood.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.UUID;

@Service

public class BoardService {

    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private UserRepository userRepository;


//글 작성 처리
    public Board write(String userid, Board board, MultipartFile file) throws Exception {

        User findUser = userRepository.findByuserid(userid);
        board.setUser(findUser);


        String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\files";

        UUID uuid = UUID.randomUUID();

        String fileName = uuid + "_" + file.getOriginalFilename();

        File saveFile = new File(projectPath, fileName);

        file.transferTo(saveFile);

        board.setFilename(fileName);
        board.setFilepath("/files/" + fileName);

        //카테고리 나눌때 참고하려고 둔 코드
//        Role role = new Role();
//        role.setId(1l);
//        user.getRoles().add(role);
//        Recipeboard recipeboard = new Recipeboard();
//        recipeboard.setRecipeid(1);
//        board.getRecipeboards().add(recipeboard);

//        if (100 <= board.getCategory() && board.getCategory() < 200) {
//            sort(board, new Recipeboard() );
//        }
        return boardRepository.save(board);
    }



    //게시글 리스트 처리
    public List<Board> boardList(){

        return boardRepository.findAll();
    }
    public List<Board> boardList1(Integer category){

        return boardRepository.findBycategory(category);
    }

    //특정 게시글 불러오기
    public Board boardView(Integer id) {

        return boardRepository.findById(id).get();
    }
    //특정 게시글 삭제
    public void boardDelete(Integer id){

        boardRepository.deleteById(id);
    }
}
