import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../button/button";
import Comment from "../comment/comment";
import Container from "../container/container";
import styles from "./board_detail.module.css";
const BoardDetail = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const board = location.state;
  const inputRef = useRef();

  console.log(board.id);
  console.log(user.id);
  const [comments, setComments] = useState([
    {
      id: 1,
      userid: "작성자1",
      username: "유저1",
      content: "한식에 대해서 배우게 되어서 좋아요!",
    },
    {
      id: 2,
      userid: "작성자2",
      username: "유저2",
      content: "다음번에는 양식에 대해서도 글 써주세요!",
    },
  ]);

  const onSubmit = () => {
    const content = inputRef.current.value;
    onCommentSubmit(content);
  };
  const onCommentSubmit = (content) => {
    const newComment = {
      id: new Date(),
      userid: user.id,
      username: user.usernickname,
      content: content,
    };
    //백엔드로 저장해야 함.
    setComments([...comments, newComment]);
  };
  const onBoardChange = (e) => {
    navigate("/boardwrite", { state: board });
  };
  const onBoardDelete = (e) => {};
  return (
    <Container title={board.category} user={user.usernickname}>
      <div className={styles.container}>
        <section className={styles.title_bar}>
          <p className={styles.title}>{board.title}</p>
          <p className={styles.user_name}>{board.userid}</p>
        </section>
        <section className={styles.content_bar}>
          {user.id === board.userid && (
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
