import React, { useState } from "react";
import RestaurantButtons from "../buttons/restuarant_buttons";
import Container from "../container/container";
import Page from "../page/page";
import styles from "./restaurant.module.css";

const Restaurant = ({ user }) => {
  const [type, setType] = useState("수도권");
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
  const [typeBoards, setTypeBoards] = useState([]);
  const handleTypeBtn = (e) => {
    setType(e.currentTarget.innerText);
    //해당 type의 보드를 백엔드에 요청해서
    //typeBoards에 저장한 후 Page에 보낸다
  };
  return (
    <Container title="맛집 카테고리" user={user}>
      <p className={styles.type}>{`<${type}>`}</p>
      <Page boards={boards} />
      <RestaurantButtons handleTypeBtn={handleTypeBtn} />
    </Container>
  );
};

export default Restaurant;
