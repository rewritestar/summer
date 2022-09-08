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
  useEffect(() => {
    user_id && auth.stayLogin(user_id).then((user) => setUser(user));
  }, [user_id]);

  const [board, setBoard] = useState({
    // id: "",
    // category: "",
    // title: "",
    // content: "",
    // filename: "",
    // filepath: "",
    // userid: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef();
  const [comments, setComments] = useState([
    {
      id: "",
      userid: "작성자1",
      username: "유저1",
      content: "한식에 대해서 배우게 되어서 좋아요!",
      boardid: "",
    },
    {
      id: "",
      userid: "작성자2",
      username: "유저2",
      content: "다음번에는 양식에 대해서도 글 써주세요!",
      boardid: "",
    },
  ]);
  useEffect(() => {
    boardApi //
      .getComments() //
      .then((comments) => {
        setComments(comments);
        console.log("댓글 조회 성공");
      });
  }, []);

  useEffect(() => {
    setBoard(location.state);
  }, [location.state]);

  const onSubmit = () => {
    const content = inputRef.current.value;
    onCommentSubmit(content);
  };
  const onCommentSubmit = (content) => {
    const comment = {
      userid: user.id,
      username: user.username,
      content: content,
      boardid: board.id,
    };
    boardApi //
      .commentWrite(comment) //
      .then((res) => console.log(`댓글이 작성되었습니다.`));
    setComments([...comments, comment]);
  };
  const onCommentDelete = (commentid) => {
    boardApi //
      .commentDelte(commentid) //
      .then((res) => {
        console.log("댓글이 삭제되었습니다.");
      });
    const newComments = comments.map((comment) => comment.id !== commentid);
    setComments(newComments);
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
          <p className={styles.user_name}>{board.userid}</p>
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
          <form className={styles.form} action="">
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
                  onCommentSubmit={onCommentSubmit}
                  onCommentDelete={onCommentDelete}
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
