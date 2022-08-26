package TheFoodProject.TheFood.Controller;

import TheFoodProject.TheFood.entity.Comment;
import TheFoodProject.TheFood.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@RequiredArgsConstructor
public class ReplyController {
    @Autowired
    private CommentService commentService;

    @PostMapping("comment/write")
    public String commentwrite(@ModelAttribute Comment comment, Integer boadid, Authentication authentication) throws Exception{

        return "";

    }
}
