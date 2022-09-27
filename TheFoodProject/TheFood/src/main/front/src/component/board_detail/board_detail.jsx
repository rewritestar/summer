import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../button/button";
import Comment from "../comment/comment";
import Container from "../container/container";
import styles from "./board_detail.module.css";
const BoardDetail = ({ auth, boardApi }) => {
  const [user, setUser] = useState();
  const user_id = localStorage.getItem("id"); //추후에 로그인 토큰으로 대체

  const navigate = useNavigate();
  const location = useLocation();

  const inputRef = useRef();
  const formRef = useRef();
  const locationBoard = location.state;
  const [board, setBoard] = useState(locationBoard);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    user_id && auth.stayLogin(user_id).then((user) => setUser(user));
  }, [user_id]);

  useEffect(() => {
    boardApi //
      .getComments(locationBoard.id) //
      .then((comments) => {
        setComments(comments);
        console.log("댓글 조회 성공");
      });
  }, []);

  const onSubmit = () => {
    const content = inputRef.current.value;
    if (!user) {
      alert("로그인이 필요한 컨텐츠입니다.");
      formRef.current.reset();
      return;
    }
    onCommentSubmit(content);
  };
  const onCommentSubmit = (content) => {
    const commentForm = {
      id: 0,
      userid: user.id,
      username: user.username,
      content: content,
      boardid: board.id,
    };
    boardApi //
      .commentWrite(commentForm) //
      .then((comments) => {
        console.log(`댓글이 작성되었습니다.`);
        setComments(comments);
      });
    formRef.current.reset();
  };
  const onCommentChange = (content, commentid) => {
    console.log(commentid);
    const commentForm = {
      id: commentid,
      userid: user.id,
      username: user.username,
      content: content,
      boardid: board.id,
    };
    console.log(commentForm);
    boardApi //
      .commentWrite(commentForm) //
      .then((newComments) => {
        console.log(`댓글이 수정되었습니다.`);
        setComments(newComments);
      });

    formRef.current.reset();
  };
  const onCommentDelete = (commentid) => {
    boardApi //
      .commentDelte(commentid) //
      .then((newComments) => {
        console.log("댓글이 삭제되었습니다.");
        setComments(newComments);
      });
  };
  const onBoardChange = (e) => {
    navigate("/boardwrite", { state: board });
  };
  const onBoardDelete = (e) => {
    boardApi //
      .boardDelete(board.id) //
      .then((result) => {
        alert("게시물이 성공적으로 삭제되었습니다.");
        setBoard({});
        navigate(`/`);
      });
  };
  return (
    <Container title={board.category} user={user}>
      <div className={styles.container}>
        <section className={styles.title_bar}>
          <p className={styles.title}>{board.title}</p>
          <p className={styles.user_name}>{board.username}</p>
        </section>
        <section className={styles.content_bar}>
          {user && user.id === board.userid && (
            <div className={styles.board_option}>
              <Button title="수정하기" onClick={onBoardChange} />
              <Button title="삭제하기" onClick={onBoardDelete} />
            </div>
          )}
          <p className={styles.content}>{board.content}</p>
          <img
            className={styles.img}
            src={board.filepath}
            alt="이미지 파일"
          ></img>
        </section>

        <section className={styles.comment_bar}>
          <div className={styles.titleAndButton}>
            <p className={styles.title}>comment</p>
            <Button title="등록" onClick={onSubmit} />
          </div>
          <form ref={formRef} className={styles.form} action="">
            <textarea
              ref={inputRef}
              className={styles.input}
              name=""
              id=""
              cols="30"
              rows="10"
            ></textarea>
          </form>
          <div className={styles.comments}>
            {comments.map((comment) => {
              return (
                <Comment
                  key={comment.id}
                  user={user}
                  comment={comment}
                  onCommentDelete={onCommentDelete}
                  onCommentChange={onCommentChange}
                />
              );
            })}
          </div>
        </section>
      </div>
    </Container>
  );
};

export default BoardDetail;
