package TheFoodProject.TheFood.service;

import TheFoodProject.TheFood.entity.Board;
import TheFoodProject.TheFood.entity.Comment;
import TheFoodProject.TheFood.repository.BoardRepository;
import TheFoodProject.TheFood.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service

public class BoardService {

    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private  SecurityService securityService;

    //보드 작성
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


        boardRepository.save(board);

        return board;
    }

    //보드 수정
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

    //카테고리별 게시판 분류
    public List<Board> boardList(){
        return boardRepository.findAll();
    }
    public List<Board> boardList1(Integer category){
        return boardRepository.findBycategory(category);
    }

    public List<Board> RecipeCategory(){ //레시피 게시판 전체

        Stream<Board> newBoards = boardRepository.findAll().stream().filter(board ->
                100 < board.getCategory()  && board.getCategory()< 200);
        return newBoards.collect(Collectors.toList());
}

    public List<Board> RestautantCategory(){ //맛집 게시판 전체
        Stream<Board> newBoards = boardRepository.findAll().stream().filter(board ->
                200 < board.getCategory()  && board.getCategory()< 300);
        return newBoards.collect(Collectors.toList());}

    //보드 삭제
    public void boardDelete(Integer id){
        boardRepository.deleteById(id);
        //해당 보드의 댓글 삭제
        List<Comment> deletecomment = commentRepository.findByboardid(id);
        for(int i=0; i< deletecomment.size(); i++){
            commentRepository.deleteById(deletecomment.get(i).getId());
        }
    }

    //내가 쓴 게시글
    public List<Board> myboard(Integer userid){
        return boardRepository.findByuserid(userid);
    }
}
