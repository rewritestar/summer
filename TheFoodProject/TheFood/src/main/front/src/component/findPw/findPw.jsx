import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../container/container";
import styles from "../user_component.module.css";
const FindPw = ({ onFindPw }) => {
  const [user, setUser] = useState();

  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };
  const goToFindId = () => {
    navigate("/findId");
  };
  const formRef = useRef();
  const idRef = useRef();
  const emailRef = useRef();
  const onSubmit = (e) => {
    e.preventDefault();
    const userid = idRef.current.value;
    const useremail = emailRef.current.value;
    const findPwForm = { userid, useremail };
    onFindPw(findPwForm);
    navigate("/");
  };

  return (
    <Container title="비밀번호 찾기" user={user}>
      <div className={styles.form_container}>
        <form
          ref={formRef}
          className={styles.form}
          id="form"
          onSubmit={onSubmit}
        >
          <div className={styles.id}>
            <span className={styles.title}>아이디</span>
            <input
              ref={idRef}
              className={styles.input}
              type="text"
              name="id"
              placeholder="아이디"
            />
          </div>
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
            <button className={styles.button} onClick={goToFindId}>
              아이디 찾기
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

export default FindPw;
