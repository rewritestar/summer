import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RestaurantButtons from "../buttons/restuarant_buttons";
import Container from "../container/container";
import Page from "../page/page";
import styles from "./restaurant.module.css";

const Restaurant = ({ auth, boardApi }) => {
  const navigate = useNavigate();
  const [type, setType] = useState("전체");
  const [typeBoards, setTypeBoards] = useState([]);

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
    boardApi //
      .getRestaurant(TYPE_CODE[type]) //
      .then((boards) => setTypeBoards(boards));
  }, [type]);

  const handleTypeBtn = (e) => {
    const currentType = e.currentTarget.innerText;
    setType(currentType);
  };

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
