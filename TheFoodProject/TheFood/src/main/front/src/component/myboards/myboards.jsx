import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Container from "../container/container";
import Page from "../page/page";
import TitleBar from "../title_bar/title_bar";
import styles from "./myboards.module.css";
const Myboards = ({ user, boardApi }) => {
  const [boards, setBoards] = useState([]);

  const location = useLocation();
  const type = location.state;

  useEffect(() => {
    type === "내 댓글 조회" &&
      boardApi //
        .getMyCommentBoards(user.id)
        .then((getboards) => {
          console.log(getboards);
          setBoards(getboards);
        });
    type === "내 게시글 조회" &&
      boardApi //
        .getMyBoards(user.id)
        .then((getboards) => setBoards(getboards));
  }, []);

  return (
    <Container>
      <TitleBar title={type} />
      <div className={styles.content}>
        <Page boards={boards} />
      </div>
    </Container>
  );
};

export default Myboards;
