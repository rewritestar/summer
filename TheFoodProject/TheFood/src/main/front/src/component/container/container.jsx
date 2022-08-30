import React from "react";
import Header from "../header/header";
import TitleBar from "../title_bar/title_bar";
import styles from "./container.module.css";
const Container = ({ user, title, children }) => {
  return (
    <>
      <div className={styles.container}>
        <Header user={user} />
        <section className={styles.content}>
          <TitleBar title={title} />
          {children}
        </section>
      </div>
    </>
  );
};

export default Container;
