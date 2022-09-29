import React, { useState } from "react";
import { useEffect } from "react";
import Container from "../container/container";
import Page from "../page/page";
import TitleBar from "../title_bar/title_bar";
import styles from "./free.module.css";
const Free = ({ auth, boardApi }) => {
  const [user, setUser] = useState();
  const [boards, setBoards] = useState([]);
  const user_id = localStorage.getItem("id"); //추후에 로그인 토큰으로 대체
  useEffect(() => {
    user_id && auth.stayLogin(user_id).then((user) => setUser(user));
  }, [user_id]);

  useEffect(() => {
    boardApi //
      .getFree()
      .then((boards) => {
        setBoards(boards);
      });
  }, []);
  return (
    <Container title="일상 카테고리">
      <TitleBar title={`< 일상 >`} />
      <div className={styles.content}>
        <Page boards={boards} />
      </div>
    </Container>
  );
};

export default Free;
