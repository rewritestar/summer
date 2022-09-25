package TheFoodProject.TheFood.service;


import TheFoodProject.TheFood.entity.Comment;
import TheFoodProject.TheFood.repository.BoardRepository;
import TheFoodProject.TheFood.repository.CommentRepository;
import TheFoodProject.TheFood.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CommentRepository commentRepository;

    public Comment commentwrite(Comment comment){
        return commentRepository.save(comment);
    }

    public List<Comment> commentList(Integer boardid){
        return commentRepository.findByboardid(boardid);
    }

    public void commentDelete(Integer id){
        commentRepository.deleteById(id);
    }



    public List<Comment> commentList1(Integer userid){
        return commentRepository.findByboardid(userid);
    }

//    public static void main(String[] args){
//        List<Integer> boardid = new ArrayList<Integer>();
//
//        int size = commentList1;
//    }

}
