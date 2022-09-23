package TheFoodProject.TheFood.Controller;

import TheFoodProject.TheFood.entity.Comment;
import TheFoodProject.TheFood.entity.CommentForm;
import TheFoodProject.TheFood.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CommentController {
    @Autowired
    private CommentService commentService;

    @PostMapping("/api/commentwrite")
    public Comment commentwrite(@RequestBody CommentForm commentForm){
        Comment newComment = new Comment();
        newComment.setContent(commentForm.getContent());
        newComment.setBoardid(commentForm.getBoardid());
        newComment.setUserid(commentForm.getUserid());
        newComment.setUsername(commentForm.getUsername());
        return commentService.commentwrite(newComment);
    }

    @GetMapping("/api/commentDelete")
    public void commentDelete(@RequestBody Integer id){
        commentService.commentDelete(id);
    }

    @PostMapping("/api/getcomments")
        public List<Comment> commentList(@RequestBody Integer id){
        return commentService.commentList(id);
    }

}
