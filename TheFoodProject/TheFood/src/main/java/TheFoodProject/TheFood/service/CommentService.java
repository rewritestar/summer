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

    public void commentwrite(Comment comment, String userid, Integer boardid){
        User findUser = userRepository.findByuserid(userid);
        comment.setUser(findUser);

        Board findBoard = boardRepository.findByid(boardid);
        comment.setBoard(findBoard);

        commentRepository.save(comment);
    }

    public List<Comment> commentList(Integer board_id){

        return commentRepository.findByboard_id(board_id);
    }

    public void commentDelete(Integer id){

        commentRepository.deleteById(id);
    }
}
