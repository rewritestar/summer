import React from "react";
import styles from "./buttons.module.css";
const RestaurantButtons = ({ handleTypeBtn }) => {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleTypeBtn}>
        전체
      </button>
      <button className={styles.button} onClick={handleTypeBtn}>
        수도권
      </button>
      <button className={styles.button} onClick={handleTypeBtn}>
        충북/충남/대전
      </button>
      <button className={styles.button} onClick={handleTypeBtn}>
        전북/전남/광주
      </button>
      <button className={styles.button} onClick={handleTypeBtn}>
        경북/대구
      </button>
      <button className={styles.button} onClick={handleTypeBtn}>
        경남/부산/울산
      </button>
      <button className={styles.button} onClick={handleTypeBtn}>
        강원
      </button>
      <button className={styles.button} onClick={handleTypeBtn}>
        제주
      </button>
      <button className={styles.button} onClick={handleTypeBtn}>
        기타
      </button>
    </div>
  );
};

export default RestaurantButtons;
