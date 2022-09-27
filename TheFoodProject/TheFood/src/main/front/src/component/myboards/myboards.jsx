import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Container from "../container/container";
import Page from "../page/page";
const Myboards = ({ auth, boardApi }) => {
  const [user, setUser] = useState();
  const user_id = localStorage.getItem("id"); //추후에 로그인 토큰으로 대체
  useEffect(() => {
    console.log(`userid : ${user_id}`);
    user_id && auth.stayLogin(user_id).then((user) => setUser(user));
  }, [user_id]);

  const location = useLocation();
  const type = location.state;
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    type === "내 댓글 조회" &&
      boardApi //
        .getMyCommentBoards(user_id)
        .then((boards) => setBoards(boards));
    type === "내 게시글 조회" &&
      boardApi //
        .getMyBoards(user_id)
        .then((boards) => setBoards(boards));
  }, []);

  return (
    <Container title={type} user={user}>
      <Page boards={boards} />
    </Container>
  );
};

export default Myboards;
