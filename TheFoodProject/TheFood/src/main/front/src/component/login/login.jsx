import { React, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../container/container";
import styles from "../user_component.module.css";
import TitleBar from "../title_bar/title_bar";
const Login = ({ onLogin, goToSignup, goToFindPw }) => {
  const navigate = useNavigate();

  const formRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();
    const useremail = emailRef.current.value;
    const userpassword = passwordRef.current.value;
    const loginForm = { useremail, userpassword };
    await onLogin(loginForm);
  };

  return (
    <Container>
      <TitleBar title="로그인" />
      <div className={styles.form_container}>
        <form
          ref={formRef}
          className={styles.form}
          id="form"
          onSubmit={onSubmit}
        >
          <div className={styles.email}>
            <span className={styles.title}>이메일</span>
            <input
              ref={emailRef}
              className={styles.input}
              type="email"
              name="email"
              placeholder="이메일"
              required
            />
          </div>
          <div className={styles.password}>
            <span className={styles.title}>비밀번호</span>
            <input
              ref={passwordRef}
              className={styles.input}
              type="password"
              name="password"
              placeholder="비밀번호"
              required
            />
          </div>
        </form>
        <section className={styles.buttons}>
          <span className={styles.link}>
            <button className={styles.button} onClick={goToSignup}>
              회원가입
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

export default Login;
