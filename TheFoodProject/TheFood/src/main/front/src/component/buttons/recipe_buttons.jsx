import React from "react";
import styles from "./buttons.module.css";
const RecipeButtons = ({ handleTypeBtn }) => {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleTypeBtn}>
        한식
      </button>
      <button className={styles.button} onClick={handleTypeBtn}>
        양식
      </button>
      <button className={styles.button} onClick={handleTypeBtn}>
        아시안식
      </button>
      <button className={styles.button} onClick={handleTypeBtn}>
        디저트
      </button>
      <button className={styles.button} onClick={handleTypeBtn}>
        음료
      </button>
      <button className={styles.button} onClick={handleTypeBtn}>
        다이어트
      </button>
      <button className={styles.button} onClick={handleTypeBtn}>
        비건
      </button>
      <button className={styles.button} onClick={handleTypeBtn}>
        야식
      </button>
      <button className={styles.button} onClick={handleTypeBtn}>
        기타
      </button>
    </div>
  );
};

export default RecipeButtons;
