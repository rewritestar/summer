import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../container/container";
import Page from "../page/page";
import TitleBar from "../title_bar/title_bar";
import styles from "./free.module.css";
const Free = ({ auth, boardApi }) => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    boardApi //
      .getFree()
      .then((boards) => {
        setBoards(boards);
      });
  }, []);

  //자동로그인
  // const [user, setUser] = useState();
  // useEffect(() => {
  //   const tokenForm = localStorage.getItem("token");
  //   if (tokenForm.expiration < new Date()) {
  //     alert(
  //       "로그인 유효기한이 만료되어 로그아웃 되었습니다. 다시 한번 로그인해주세요."
  //     );
  //     navigate("/login");
  //   } else {
  //     auth
  //       .stayLogin(tokenForm) //
  //       .then((u) => {
  //         setUser(u);
  //       });
  //   }
  // }, []);
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
