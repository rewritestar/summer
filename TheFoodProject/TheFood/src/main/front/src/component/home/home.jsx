import React, { useEffect, useState } from "react";
import Header from "../header/header";
import MainPage from "../main_page/main_page";
import styles from "./home.module.css";

const Home = ({ auth }) => {
  const [user, setUser] = useState();
  const user_id = localStorage.getItem("id"); //추후에 로그인 토큰으로 대체

  useEffect(() => {
    user_id && auth.stayLogin(user_id).then((user) => setUser(user));
  }, [user_id, auth]);

  return (
    <div className={styles.container}>
      <Header />
      <section className={styles.content}>
        <MainPage />
      </section>
      <div className={styles.bg_subcolor}></div>
    </div>
  );
};

export default Home;
