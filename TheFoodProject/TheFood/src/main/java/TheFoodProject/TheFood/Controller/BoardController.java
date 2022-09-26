package TheFoodProject.TheFood.Controller;

import TheFoodProject.TheFood.entity.Board;
import TheFoodProject.TheFood.entity.BoardForm;
import TheFoodProject.TheFood.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController

public class BoardController {

    @Autowired
    private BoardService boardService;

//    @PostMapping("/api/boardwrite")
//    public String boardWritePro(Board board, MultipartFile file, Authentication authentication) throws Exception{
//        String userid = authentication.getName();
//        boardService.write(userid, board, file);
//        return "redirect:/board/list";
//    }

    //보드 작성
    @PostMapping("/api/boardwrite")
    public Board boardWritePro(@RequestBody BoardForm boardForm) throws Exception{
        Board newBoard = new Board();
        newBoard.setTitle(boardForm.getTitle());
        newBoard.setContent(boardForm.getContent());
        newBoard.setCategory(boardForm.getCategory());
        newBoard.setFilepath(boardForm.getFilepath());
        newBoard.setFilename(boardForm.getFilename());
        newBoard.setUsername(boardForm.getUsername());
        newBoard.setUserid(boardForm.getUserid());

        if (boardForm.getId() != 0){
            return boardService.update(boardForm.getId(), newBoard);
        }
        else{
        return boardService.write(newBoard);}
    }

    //카테고리별 게시판 분류
    @PostMapping("/api/recipe")
    public List<Board> recipeBoardList(@RequestBody Integer category){
        return boardService.boardList1(category);
    }
    @PostMapping("/api/restaurant")
    public List<Board> restaurantBoardList(@RequestBody Integer category){
        return boardService.boardList1(category);
    }
    @GetMapping("/api/free")
    public List<Board> freeBoardList(){
        return boardService.boardList1(300);
    }

    //보드 삭제
    @PostMapping("/api/boarddelete")
    public void boardDelete(@RequestBody Integer id){
        boardService.boardDelete(id);
    }

    //내가 쓴 게시글
    @PostMapping("/api/myboards/boards")
    public List<Board> mywriteboard(@RequestBody Integer userid){
        return boardService.myboard(userid);
    }



}
