package TheFoodProject.TheFood.service;


import TheFoodProject.TheFood.entity.Board;
import TheFoodProject.TheFood.entity.Comment;
import TheFoodProject.TheFood.repository.BoardRepository;
import TheFoodProject.TheFood.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service

public class CommentService {
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private BoardRepository boardRepository;

    //댓글 작성
    public List<Comment> write(Comment comment){
        commentRepository.save(comment);
        List<Comment> commentList = commentRepository.findByboardid(comment.getBoardid());
        return commentList;
    }
    //댓글 수정
    public List<Comment> update(Integer commentid, Comment comment) throws Exception {

        Comment updateComment = commentRepository.findByid(commentid);
        updateComment.setContent(comment.getContent());

        commentRepository.save(updateComment);
        List<Comment> commentList = commentRepository.findByboardid(comment.getBoardid());
        return commentList;
    }
    //댓글 삭제
    public List<Comment> commentDelete(Integer id){
        Comment comment = commentRepository.findByid(id);
        commentRepository.deleteById(id);
        return commentRepository.findByboardid(comment.getBoardid());
    }
    //댓글 불러오기
    public List<Comment> commentList(Integer boardid){
        return commentRepository.findByboardid(boardid);
    }

    //내 댓글 게시판 목록
    public List<Board> commentBoard(Integer userid) throws Exception {
        List<Comment> comments = commentRepository.findByuserid(userid); //해당 유저가 쓴 댓글리스트를 조회

        ArrayList<Integer> boardidlist = new ArrayList<Integer>();  //댓글리스트들의 보드 아이디를 다른 리스트로 추출
        for(int i=0; i< comments.size(); i++){
            boardidlist.add(comments.get(i).getBoardid());
        }

        //보드아이디 값 중복제거
        List<Integer> newList = boardidlist.stream().distinct().collect(Collectors.toList());

        //보드아이디 값을 통해 보드 추출
        ArrayList<Board> myboard = new ArrayList<Board>();
        for(int j=0; j< newList.size(); j++){
            myboard.add(boardRepository.findByid(newList.get(j)));
        }

        return myboard;
    }


}
