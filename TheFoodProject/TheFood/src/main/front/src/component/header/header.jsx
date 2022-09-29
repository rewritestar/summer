import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/footer";
import UserBtn from "../user_btn/user_btn";
import styles from "./header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };
  const goToRecipe = () => {
    navigate("/recipe");
  };
  const goToRestaurant = () => {
    navigate("/restaurant");
  };
  const goToFree = () => {
    navigate("/free");
  };
  const goToBoardWrite = () => {
    navigate("/boardwrite");
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <section className={styles.logo} onClick={goToHome}>
          <img className={styles.icon} src="/images/logo.png" alt="logo"></img>
          <h1 className={styles.title}>The Food</h1>
        </section>
        <section className={styles.category}>
          <p className={styles.title}>category</p>
          <div className={styles.buttons}>
            <button className={styles.button} onClick={goToRecipe}>
              레시피
            </button>
            <button className={styles.button} onClick={goToRestaurant}>
              맛집
            </button>
            <button className={styles.button} onClick={goToFree}>
              일상
            </button>
          </div>
        </section>
        <section className={styles.write}>
          <p className={styles.title}>write</p>
          <button className={styles.button} onClick={goToBoardWrite}>
            게시글 작성
          </button>
        </section>
        <section className={styles.sns}>
          <p className={styles.title}>sns</p>
          <div className={styles.buttons}>
            <button className={styles.button}>i</button>
            <button className={styles.button}>f</button>
            <button className={styles.button}>t</button>
          </div>
        </section>
      </div>
      <div className={styles.footer}>
        <Footer display="column" />
      </div>
      {/* <div className={styles.user_btn}>
        <UserBtn user={user} />
      </div> */}
    </div>
  );
};

export default Header;
