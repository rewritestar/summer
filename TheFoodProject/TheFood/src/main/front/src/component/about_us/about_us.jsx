import React from "react";
import styles from "./about_us.module.css";
import { AiFillGithub } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { BsInstagram } from "react-icons/bs";

const AboutUs = ({ goToHome }) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>About us</p>
      <div className={styles.content}>
        <div className={styles.person}>
          <div className={styles.front}>
            <div className={styles.profile}>
              <img className={styles.img} src="images/ex1.jpg" alt="" />
              <div className={styles.info}>
                <p className={styles.text}>조인미</p>
                <p className={styles.text}>상명대학교 컴퓨터과학과</p>
              </div>
            </div>
            <div className={styles.links}>
              <AiFillGithub
                className={styles.icon}
                onClick={() =>
                  window.open("https://github.com/rewritestar", "_blank")
                }
              />
              <HiOutlineMail
                className={styles.icon}
                onClick={() =>
                  window.open("mailto:rewritestar@naver.com", "_blank")
                }
              />
              <BsInstagram
                className={styles.icon}
                onClick={() =>
                  window.open("https://github.com/su-jin02", "_blank")
                }
              />
            </div>
          </div>
          <p className={styles.sub_title}>Front-end</p>
        </div>
        <div className={styles.person}>
          <p className={styles.sub_title}>Back-end</p>
          <div className={styles.back}>
            <div className={styles.profile}>
              <img className={styles.img} src="images/ex2.jpg" alt="" />
              <div className={styles.info}>
                <p className={styles.text}>전수진</p>
                <p className={styles.text}>성신여자대학교 과</p>
              </div>
            </div>
            <div className={styles.links}>
              <AiFillGithub
                className={styles.icon}
                onClick={() =>
                  window.open("https://github.com/su-jin02", "_blank")
                }
              />
              <HiOutlineMail
                className={styles.icon}
                onClick={() => window.open("mailto:@naver.com", "_blank")}
              />
              <BsInstagram
                className={styles.icon}
                onClick={() =>
                  window.open("https://github.com/su-jin02", "_blank")
                }
              />
            </div>
          </div>
        </div>
      </div>
      <section
        className={styles.logo}
        onClick={() => (window.location.href = "/")}
      >
        <img className={styles.logo_img} src="images/logo_proto.png" alt="" />
        <p className={styles.logo_title}>The Food</p>
      </section>
    </div>
  );
};

export default AboutUs;
