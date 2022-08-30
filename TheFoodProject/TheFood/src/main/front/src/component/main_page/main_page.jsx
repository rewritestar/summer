import React from "react";
import styles from "./main_page.module.css";
const MainPage = (props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.description}>find LIFE in FOOD</h1>
      <section className={styles.img_section}>
        <img src="images/main_01.png" alt="main"></img>
      </section>
    </div>
  );
};

export default MainPage;
