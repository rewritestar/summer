import React, { useEffect, useState } from "react";
import RestaurantButtons from "../buttons/restuarant_buttons";
import Container from "../container/container";
import Page from "../page/page";
import styles from "./restaurant.module.css";

const Restaurant = ({ auth, boardApi }) => {
  const [user, setUser] = useState();
  const [typeBoards, setTypeBoards] = useState([]);
  const [type, setType] = useState("수도권");

  const user_id = localStorage.getItem("id"); //추후에 로그인 토큰으로 대체

  const TYPE_CODE = {
    전체: 200,
    수도권: 201,
    "충북/충남/대전": 202,
    "전북/전남/광주": 203,
    "경북/대구": 204,
    "경남/부산/울산": 205,
    강원: 206,
    제주: 207,
    기타: 208,
  };

  useEffect(() => {
    user_id && auth.stayLogin(user_id).then((user) => setUser(user));
  }, [user_id]);

  useEffect(() => {
    boardApi //
      .getRecipe(TYPE_CODE[type]) //
      .then((boards) => setTypeBoards(boards));
  }, [type]);

  const handleTypeBtn = (e) => {
    const currentType = e.currentTarget.innerText;
    setType(currentType);
  };
  return (
    <Container title="맛집 카테고리">
      <RestaurantButtons handleTypeBtn={handleTypeBtn} />
      <p className={styles.type}>{`< 맛집 - ${type} >`}</p>
      <div className={styles.content}>
        <Page boards={typeBoards} />
      </div>
    </Container>
  );
};

export default Restaurant;
