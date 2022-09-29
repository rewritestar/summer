import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../button/button";
import CommentList from "../comment_list/comment_list";
import Container from "../container/container";
import styles from "./board_detail.module.css";
const BoardDetail = ({ auth, boardApi }) => {
  const user_id = localStorage.getItem("id"); //추후에 로그인 토큰으로 대체

  const navigate = useNavigate();
  const location = useLocation();

  //게시물 가져오기
  const locationBoard = location.state;

  const [board, setBoard] = useState(locationBoard);
  const [user, setUser] = useState();

  useEffect(() => {
    user_id && auth.stayLogin(user_id).then((user) => setUser(user));
  }, [user_id]);

  //게시물 수정버튼
  const onBoardChange = (e) => {
    navigate("/boardwrite", { state: board });
  };
  //게시물 삭제버튼
  const onBoardDelete = (e) => {
    boardApi //
      .boardDelete(board.id) //
      .then((_) => {
        alert("게시물이 성공적으로 삭제되었습니다.");
        setBoard({});
        window.location.href = "/";
      });
  };
  return (
    <Container title={board.category}>
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
        <CommentList
          boardApi={boardApi}
          board={board}
          boardid={locationBoard.id}
          user={user}
        />
      </div>
    </Container>
  );
};

export default BoardDetail;
