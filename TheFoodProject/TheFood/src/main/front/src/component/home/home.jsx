import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../header/header";
import MainPage from "../main_page/main_page";
import styles from "./home.module.css";

const Home = ({ user, onLogout }) => {
  const location = useLocation();
  useEffect(() => {
    if (location.state === "logout") {
      onLogout();
    }
  }, [location.state]);

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
