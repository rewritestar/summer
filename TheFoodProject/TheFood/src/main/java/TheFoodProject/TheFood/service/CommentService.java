package TheFoodProject.TheFood.service;


import TheFoodProject.TheFood.entity.Board;
import TheFoodProject.TheFood.entity.Comment;
import TheFoodProject.TheFood.entity.User;
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

    public Comment commentwrite(Integer userid, Integer boardid, Comment comment){
        User findUser = userRepository.findByid(userid);
        comment.setUser(findUser);

        Board findBoard = boardRepository.findByid(boardid);
        comment.setBoard(findBoard);

        return commentRepository.save(comment);
    }

    public List<Comment> commentList(Integer boardid){

        return commentRepository.findByboard_id(boardid);
    }

    public void commentDelete(Integer id){

        commentRepository.deleteById(id);
    }
}
