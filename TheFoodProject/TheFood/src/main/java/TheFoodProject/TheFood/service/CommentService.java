package TheFoodProject.TheFood.service;


import TheFoodProject.TheFood.repository.BoardRepository;
import TheFoodProject.TheFood.repository.CommentRepository;
import TheFoodProject.TheFood.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {
    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CommentRepository commentRepository;

    public String commentwrite(){
        return "";
    }
}
