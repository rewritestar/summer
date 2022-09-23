package TheFoodProject.TheFood.Controller;

import TheFoodProject.TheFood.entity.Board;
import TheFoodProject.TheFood.entity.BoardForm;
import TheFoodProject.TheFood.service.BoardService;
import TheFoodProject.TheFood.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController

public class BoardController {

//    @Autowired
//    private CommentService commentService;
    @Autowired
    private BoardService boardService;

//    @PostMapping("/api/boardwrite")
//    public String boardWritePro(Board board, MultipartFile file, Authentication authentication) throws Exception{
//
//        String userid = authentication.getName();
//        boardService.write(userid, board, file);
//
//        return "redirect:/board/list";
//    }

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


    @PostMapping("/api/boarddelete")
    public void boardDelete(@RequestBody Integer id){
        boardService.boardDelete(id);
    }


//    @PostMapping("/board/update/{id}")
//    public String boardUpdate(@PathVariable("id") Integer id, Board board, MultipartFile file, Authentication authentication) throws Exception{
//
//        Board boardTemp = boardService.boardView(id);
//        boardTemp.setTitle(board.getTitle());
//        boardTemp.setContent(board.getContent());
//
//        String username = authentication.getName();
//        boardService.write(username, boardTemp, file);
//
//        return "redirect:/board/list";
//    }

    @PostMapping("/api/myboards/boards")
    public List<Board> mywriteboard(@RequestBody Integer id){

        return boardService.myboard(id);
    }

}
