import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../header/header";
import MainPage from "../main_page/main_page";
import styles from "./home.module.css";

const Home = ({ auth, onLogout }) => {
  const [user, setUser] = useState();
  const user_id = localStorage.getItem("id"); //추후에 로그인 토큰으로 대체

  useEffect(() => {
    user_id && auth.stayLogin(user_id).then((user) => setUser(user));
  }, [user_id]);

  return (
    <>
      <div className={styles.home}>
        <Header user={user} />
        <section className={styles.content}>
          <MainPage />
        </section>
      </div>
    </>
  );
};

export default Home;
