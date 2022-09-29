import React from "react";
import Header from "../header/header";
import TitleBar from "../title_bar/title_bar";
import styles from "./container.module.css";
const Container = ({ title, children }) => {
  return (
    <>
      <div className={styles.container}>
        <Header />
        <section className={styles.content}>
          <TitleBar title={title} />
          {children}
        </section>
      </div>
    </>
  );
};

export default Container;
