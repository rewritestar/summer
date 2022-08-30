import React, { useState } from "react";
import Container from "../container/container";
import Page from "../page/page";

const Free = ({ user }) => {
  const [boards, setBoards] = useState([
    {
      id: 1,
      category: 101,
      title: "예시1",
      content: "예시내용1",
      filename: "파일이름1",
      filepath: "./images/logo.png",
      userid: "작성자1",
    },
    {
      id: 2,
      category: 102,
      title: "예시1",
      content: "예시내용1",
      filename: "파일이름1",
      filepath: "./images/logo.png",
      userid: "작성자1",
    },
    {
      id: 3,
      category: 102,
      title: "예시1",
      content: "예시내용1",
      filename: "파일이름1",
      filepath: "./images/logo.png",
      userid: "작성자1",
    },
    {
      id: 4,
      category: 102,
      title: "예시1",
      content: "예시내용1",
      filename: "파일이름1",
      filepath: "./images/logo.png",
      userid: "작성자1",
    },
    {
      id: 5,
      category: 101,
      title: "예시1",
      content: "예시내용1",
      filename: "파일이름1",
      filepath: "./images/logo.png",
      userid: "작성자1",
    },
    {
      id: 6,
      category: 102,
      title: "예시1",
      content: "예시내용1",
      filename: "파일이름1",
      filepath: "./images/logo.png",
      userid: "작성자1",
    },
    {
      id: 7,
      category: 102,
      title: "예시1",
      content: "예시내용1",
      filename: "파일이름1",
      filepath: "./images/logo.png",
      userid: "작성자1",
    },
    {
      id: 8,
      category: 102,
      title: "예시1",
      content: "예시내용1",
      filename: "파일이름1",
      filepath: "./images/logo.png",
      userid: "작성자1",
    },
    {
      id: 9,
      category: 101,
      title: "예시1",
      content: "예시내용1",
      filename: "파일이름1",
      filepath: "./images/logo.png",
      userid: "작성자1",
    },
    {
      id: 10,
      category: 102,
      title: "예시1",
      content: "예시내용1",
      filename: "파일이름1",
      filepath: "./images/logo.png",
      userid: "작성자1",
    },
    {
      id: 11,
      category: 102,
      title: "예시1",
      content: "예시내용1",
      filename: "파일이름1",
      filepath: "./images/logo.png",
      userid: "작성자1",
    },
    {
      id: 12,
      category: 102,
      title: "예시1",
      content: "예시내용1",
      filename: "파일이름1",
      filepath: "./images/logo.png",
      userid: "작성자1",
    },
    {
      id: 13,
      category: 102,
      title: "예시1",
      content: "예시내용1",
      filename: "파일이름1",
      filepath: "./images/logo.png",
      userid: "작성자1",
    },
  ]);
  return (
    <Container title="일상 카테고리" user={user}>
      <Page boards={boards} />
    </Container>
  );
};

export default Free;
