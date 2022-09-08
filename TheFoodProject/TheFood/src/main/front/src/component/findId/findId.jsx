import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../container/container";
import styles from "../user_component.module.css";
const FindId = ({ onFindId }) => {
  const [user, setUser] = useState();

  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };
  const goToFindPw = () => {
    navigate("/findPw");
  };
  const formRef = useRef();
  const emailRef = useRef();
  const onSubmit = (e) => {
    e.preventDefault();
    const useremail = emailRef.current.value;
    onFindId(useremail);
    navigate("/");
  };
  return (
    <Container title="아이디 찾기" user={user}>
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
              type="text"
              name="email"
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
