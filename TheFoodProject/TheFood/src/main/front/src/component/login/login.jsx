import { React, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../container/container";
import styles from "../user_component.module.css";
import TitleBar from "../title_bar/title_bar";
const Login = ({ onLogin, goToSignup, goToFindId }) => {
  const navigate = useNavigate();

  const formRef = useRef();
  const idRef = useRef();
  const passwordRef = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();
    const userid = idRef.current.value;
    const userpassword = passwordRef.current.value;
    const loginForm = { userid, userpassword };
    await onLogin(loginForm);
    navigate("/");
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
          <div className={styles.id}>
            <span className={styles.title}>아이디</span>
            <input
              ref={idRef}
              className={styles.input}
              type="text"
              name="id"
              placeholder="아이디"
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
            <button className={styles.button} onClick={goToFindId}>
              아이디/비밀번호 찾기
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
