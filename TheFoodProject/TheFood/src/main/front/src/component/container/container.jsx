import React from "react";
import Header from "../header/header";
import styles from "./container.module.css";
const Container = ({ children }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.bg_subcolor}></div>
        <Header />
        <section className={styles.content}>{children}</section>
      </div>
    </>
  );
};

export default Container;
