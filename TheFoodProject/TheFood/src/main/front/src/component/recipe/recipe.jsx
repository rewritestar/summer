import React, { useState, useEffect } from "react";
import RecipeButtons from "../buttons/recipe_buttons";
import Container from "../container/container";
import Page from "../page/page";
import styles from "./recipe.module.css";

const Recipe = ({ boardApi, auth }) => {
  const [user, setUser] = useState();

  const user_id = localStorage.getItem("id"); //추후에 로그인 토큰으로 대체
  useEffect(() => {
    user_id && auth.stayLogin(user_id).then((user) => setUser(user));
  }, [user_id]);

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
  const [type, setType] = useState("한식");

  const [typeBoards, setTypeBoards] = useState([]);

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
    <Container title="레시피 카테고리" user={user}>
      <p className={styles.type}>{`<${type}>`}</p>
      <Page boards={typeBoards} />
      <RecipeButtons handleTypeBtn={handleTypeBtn} />
    </Container>
  );
};

export default Recipe;
