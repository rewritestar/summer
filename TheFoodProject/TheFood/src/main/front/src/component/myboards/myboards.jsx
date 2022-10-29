import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../container/container";
import Page from "../page/page";
import TitleBar from "../title_bar/title_bar";
import styles from "./myboards.module.css";
const Myboards = ({ auth, boardApi }) => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);

  const location = useLocation();
  const type = location.state;

  const [user, setUser] = useState();
  useEffect(() => {
    const tokenForm = localStorage.getItem("token");
    if (tokenForm.expiration < new Date()) {
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

  useEffect(() => {
    if (user) {
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
    }
  }, [user]);

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
