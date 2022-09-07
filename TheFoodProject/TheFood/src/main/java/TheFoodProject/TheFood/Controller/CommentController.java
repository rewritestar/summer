package TheFoodProject.TheFood.Controller;

import TheFoodProject.TheFood.entity.Comment;
import TheFoodProject.TheFood.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CommentController {
    @Autowired
    private CommentService commentService;

    @PostMapping("/api/commentwrite")
    public String commentwrite(Comment comment, Integer boardid, Authentication authentication) throws Exception{
        String userid = authentication.getName();
        commentService.commentwrite(comment, userid, boardid);
        return "redirect:/board/list";
    }

    @GetMapping("/comment/delete")
    public String commentDelete(Integer id){
        commentService.commentDelete(id);
        return "redirect:/board/list";
    }

    @PostMapping("/api/getcomments")
        public List<Comment> commentList(Integer id){
        return commentService.commentList(id);
    }

}
