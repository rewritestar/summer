package TheFoodProject.TheFood.Controller;

import TheFoodProject.TheFood.entity.Board;
import TheFoodProject.TheFood.entity.Comment;
import TheFoodProject.TheFood.entity.CommentForm;
import TheFoodProject.TheFood.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CommentController {
    @Autowired
    private CommentService commentService;

    //댓글 작성
    @PostMapping("/api/commentwrite")
    public Comment commentwrite(@RequestBody CommentForm commentForm) throws Exception {
        Comment newComment = new Comment();
        newComment.setContent(commentForm.getContent());
        newComment.setBoardid(commentForm.getBoardid());
        newComment.setUserid(commentForm.getUserid());
        newComment.setUsername(commentForm.getUsername());

        if (commentForm.getId() != 0){
            return commentService.update(commentForm.getId(), newComment);
        }
        else{
            return commentService.write(newComment);}
    }

    //댓글 삭제
    @PostMapping("/api/commentDelete")
    public void commentDelete(@RequestBody Integer id){
        commentService.commentDelete(id);
    }

    //댓글 불러오기
    @PostMapping("/api/getcomments")
        public List<Comment> commentList(@RequestBody Integer boardid){
        return commentService.commentList(boardid);
    }

    //내 댓글 게시판 목록
    @PostMapping("api/myboards/comments")
    public List<Board> commentBoard(@RequestBody Integer userid) throws Exception { return commentService.commentBoard(userid); }

}
