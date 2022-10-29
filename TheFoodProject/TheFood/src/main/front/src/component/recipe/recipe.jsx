import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecipeButtons from "../buttons/recipe_buttons";
import Container from "../container/container";
import Page from "../page/page";
import styles from "./recipe.module.css";

const Recipe = ({ auth, boardApi }) => {
  const navigate = useNavigate();
  const [type, setType] = useState("전체");
  const [typeBoards, setTypeBoards] = useState([]);

  const TYPE_CODE = {
    전체: 100,
    한식: 101,
    양식: 102,
    아시안식: 103,
    디저트: 104,
    음료: 105,
    다이어트: 106,
    비건: 107,
    야식: 108,
    기타: 109,
  };
  useEffect(() => {
    boardApi //
      .getRecipe(TYPE_CODE[type]) //
      .then((boards) => setTypeBoards(boards));
  }, [type]);

  const handleTypeBtn = (e) => {
    const currentType = e.currentTarget.innerText;
    setType(currentType);
  };

  //자동 로그인
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

  return (
    <Container>
      <RecipeButtons handleTypeBtn={handleTypeBtn} />
      <p className={styles.type}>{`< 레시피 - ${type} >`}</p>
      <div className={styles.content}>
        <Page boards={typeBoards} />
      </div>
    </Container>
  );
};

export default Recipe;
