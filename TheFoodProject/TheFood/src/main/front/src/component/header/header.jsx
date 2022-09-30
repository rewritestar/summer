import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
const Header = () => {
  const [isActive, setActive] = useState(false);

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
  const goToAbout = (e) => {
    navigate("/aboutus");
  };
  const styles_res = isActive ? styles.active : styles.none;
  console.log(isActive);

  return (
    <div className={styles.container}>
      <section className={styles.logo} onClick={goToHome}>
        <img
          className={styles.img}
          src="/images/logo_proto.png"
          alt="logo"
        ></img>
        <h1 className={styles.title}>The Food</h1>
      </section>
      <section className={`${styles.menu} ${styles_res}`}>
        <section className={styles.category}>
          <p className={styles.name}>-category-</p>
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
        <button className={styles.about_btn} onClick={goToAbout}>
          About us
        </button>
        <section className={styles.write}>
          <p className={styles.name}>-write-</p>
          <button className={styles.write_btn} onClick={goToBoardWrite}>
            게시글 작성
          </button>
        </section>
      </section>
      <AiOutlineMenu
        className={styles.res_btn}
        onClick={() => {
          setActive(!isActive);
        }}
      />
    </div>
  );
};

export default Header;
