import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../button/button";
import CommentList from "../comment_list/comment_list";
import Container from "../container/container";
import styles from "./board_detail.module.css";
import TitleBar from "../title_bar/title_bar";
const BoardDetail = ({ auth, boardApi }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const TYPE_CODE = {
    101: "레시피-한식",
    102: "레시피-양식",
    103: "레시피-아시안식",
    104: "레시피-디저트",
    105: "레시피-음료",
    106: "레시피-다이어트",
    107: "레시피-비건",
    108: "레시피-야식",
    109: "레시피-기타",
    201: "맛집-수도권",
    202: "맛집-충북/충남/대전",
    203: "맛집-전북/전남/광주",
    204: "맛집-경북/대구",
    205: "맛집-경남/부산/울산",
    206: "맛집-강원",
    207: "맛집-제주",
    208: "맛집-기타",
    300: "일상게시판",
  };
  //게시물 가져오기
  const locationBoard = location.state;

  const [board, setBoard] = useState(locationBoard);

  const makeDate = (board) => {
    let date = new Date(2001, 1, 1);
    if (board.date) {
      date = new Date(board.date);
    }
    const WEEK = ["일", "월", "화", "수", "목", "금", "토"];
    const HOURS = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
    const MINUTES =
      date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
    const result = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${HOURS}:${MINUTES}(${WEEK[date.getDate()]})`;
    return result;
  };
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
        navigate("/myboards", { state: "내 게시글 조회" });
        setBoard({});
      });
  };

  //자동 로그인
  const [user, setUser] = useState();
  useEffect(() => {
    const tokenForm = localStorage.getItem("token");
    if (!tokenForm) {
      return;
    }
    if (new Date(tokenForm.expiration) < new Date()) {
      alert(
        "로그인 유효기한이 만료되어 로그아웃 되었습니다. 다시 한번 로그인해주세요."
      );
      navigate("/login");
    } else {
      auth
        .stayLogin(tokenForm) //
        .then((u) => {
          setUser(u);
        });
    }
  }, []);
  return (
    <Container>
      <TitleBar title={TYPE_CODE[board.category]} />
      <div className={styles.container}>
        <section className={styles.title_bar}>
          <p className={styles.title}>{board.title}</p>
          <p className={styles.user_name}>{board.username}</p>
          <p className={styles.date}>{makeDate(board)}</p>
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
          user={user ? user : null}
        />
      </div>
    </Container>
  );
};

export default BoardDetail;
