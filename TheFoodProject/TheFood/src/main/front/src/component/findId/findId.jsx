import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../container/container";
import styles from "../user_component.module.css";
import TitleBar from "../title_bar/title_bar";

const FindId = ({ onFindId, goToLogin, goToFindPw }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState();

  const formRef = useRef();
  const emailRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    const useremail = emailRef.current.value;
    onFindId(useremail);
    navigate("/");
  };

  return (
    <Container>
      <TitleBar title="아이디 찾기" />
      <div className={styles.form_container}>
        <form
          ref={formRef}
          id="form"
          className={styles.form}
          onSubmit={onSubmit}
        >
          <div className={styles.email}>
            <span className={styles.title}>이메일</span>
            <input
              ref={emailRef}
              className={styles.input}
              type="email"
              name="username"
              placeholder="이메일"
            />
          </div>
        </form>
        <section className={styles.buttons}>
          <span className={styles.link}>
            <button className={styles.button} onClick={goToLogin}>
              로그인
            </button>
            <button className={styles.button} onClick={goToFindPw}>
              비밀번호 찾기
            </button>
          </span>
          <button type="submit" form="form" className={styles.submit_btn}>
            등록
          </button>
        </section>
      </div>
    </Container>
  );
};

export default FindId;
