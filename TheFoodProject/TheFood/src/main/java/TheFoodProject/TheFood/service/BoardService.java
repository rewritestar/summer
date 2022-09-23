package TheFoodProject.TheFood.service;

import TheFoodProject.TheFood.entity.Board;
import TheFoodProject.TheFood.repository.BoardRepository;
import TheFoodProject.TheFood.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class BoardService {

    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private UserRepository userRepository;


//글 작성 처리
    public Board write(Board board) throws Exception {


//        String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\files";
//
//        UUID uuid = UUID.randomUUID();
//
//        String fileName = uuid + "_" + file.getOriginalFilename();
//
//        File saveFile = new File(projectPath, fileName);
//
//        file.transferTo(saveFile);
//
//        board.setFilename(fileName);
//        board.setFilepath("/files/" + fileName);

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

        boardRepository.save(board);

        return board;
    }

    public Board update(Integer boardid, Board board) throws Exception {

        Board updateboard = boardRepository.findByid(boardid);

        updateboard.setTitle(board.getTitle());
        updateboard.setContent(board.getContent());
        updateboard.setFilename(board.getFilename());
        updateboard.setFilepath(board.getFilepath());
        updateboard.setCategory(board.getCategory());

        boardRepository.save(updateboard);

        return updateboard;
    }


    //게시글 리스트 처리
    public List<Board> boardList(){

        return boardRepository.findAll();
    }
    public List<Board> boardList1(Integer category){

        return boardRepository.findBycategory(category);
    }

    //특정 게시글 삭제
    public void boardDelete(Integer id){

        boardRepository.deleteById(id);
    }

    //내가 쓴 글
    public List<Board> myboard(Integer userid){

        return boardRepository.findByuserid(userid);
    }
}
