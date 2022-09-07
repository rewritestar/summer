package TheFoodProject.TheFood.Controller;

import TheFoodProject.TheFood.entity.Board;
import TheFoodProject.TheFood.service.BoardService;
import TheFoodProject.TheFood.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController

public class BoardController {

    @Autowired
    private CommentService commentService;
    @Autowired
    private BoardService boardService;
    @PostMapping("/api/boardwrite")
    public String boardWritePro(Board board, MultipartFile file, Authentication authentication) throws Exception{

        String userid = authentication.getName();
        boardService.write(userid, board, file);

        return "redirect:/board/list";
    }

    @PostMapping("/api/recipe")
    public List<Board> recipeBoardList(Integer category){
        return boardService.boardList1(category);
    }
    @PostMapping("/api/restaurant")
    public List<Board> restaurantBoardList(Integer category){
        return boardService.boardList1(category);
    }
    @PostMapping("/api/free")
    public List<Board> freeBoardList(Integer category){
        return boardService.boardList1(category);
    }


    @GetMapping("/board/view") // localhost:8080/board/view?id=1
    public String boardView(Model model, Integer id){

        model.addAttribute("board", boardService.boardView(id));
        model.addAttribute("list1", commentService.commentList(id));
        return "boardview";
    }

    @PostMapping("/api/boarddelete")
    public void boardDelete(Integer id){

        boardService.boardDelete(id);
    }


    @GetMapping("/board/modify/{id}")
    public String boardModify(@PathVariable("id") Integer id, Model model) {

        model.addAttribute("board", boardService.boardView(id));

        return "boardmodify";
    }

    @PostMapping("/board/update/{id}")
    public String boardUpdate(@PathVariable("id") Integer id, Board board, MultipartFile file, Authentication authentication) throws Exception{

        Board boardTemp = boardService.boardView(id);
        boardTemp.setTitle(board.getTitle());
        boardTemp.setContent(board.getContent());

        String username = authentication.getName();
        boardService.write(username, boardTemp, file);

        return "redirect:/board/list";
    }

}
