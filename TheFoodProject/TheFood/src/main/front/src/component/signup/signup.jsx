import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../container/container";
import styles from "../user_component.module.css";
import TitleBar from "../title_bar/title_bar";

const Signup = ({ onSignup, goToLogin, goToFindId }) => {
  const navigate = useNavigate();

  const formRef = useRef();
  const idRef = useRef();
  const passwordRef = useRef();
  const password_checkRef = useRef();
  const emailRef = useRef();
  const nameRef = useRef();

  const [check, setCheck] = useState({
    password: "",
    password_check: "",
  });
  const [word, setWord] = useState({
    word: "",
    color: "pink",
  });

  const style_color = word.color === "pink" ? styles.pink : styles.green;
  const { password, password_check } = check;
  const { text, color } = word;

  useEffect(() => {
    checkPw();
  }, [check]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCheck({ ...check, [name]: value });
  };
  const checkPw = () => {
    if (password.length < 1 || password_check.length < 1) {
      setWord({ text: "", color: "" });
    } else if (password !== password_check) {
      setWord({ text: "비밀번호가 일치하지 않습니다.", color: "pink" });
    } else {
      setWord({ text: "비밀번호가 일치합니다.", color: "green" });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userid = idRef.current.value;
    const userpassword = passwordRef.current.value;
    const userpassword_check = password_checkRef.current.value;
    const useremail = emailRef.current.value;
    const username = nameRef.current.value;
    if (userpassword !== userpassword_check) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    const signupForm = { userid, userpassword, useremail, username };

    onSignup(signupForm);
  };
  return (
    <Container>
      <TitleBar title="회원가입" />
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
              onChange={handleChange}
            />
          </div>
          <div className={styles.password_check}>
            <span className={styles.title}>비밀번호 확인</span>
            <input
              ref={password_checkRef}
              className={styles.input}
              type="password"
              name="password_check"
              placeholder="비밀번호 확인"
              required
              onChange={handleChange}
            />
          </div>
          <p className={`${styles.password_word} ${style_color}`}>{text}</p>
          <div className={styles.email}>
            <span className={styles.title}>이메일</span>
            <input
              ref={emailRef}
              className={styles.input}
              type="text"
              name="useremail"
              placeholder="이메일"
              required
            />
          </div>
          <div className={styles.nickname}>
            <span className={styles.title}>닉네임</span>
            <input
              ref={nameRef}
              className={styles.input}
              type="text"
              name="name"
              placeholder="닉네임"
              required
            />
          </div>
        </form>
        <section className={styles.buttons}>
          <span className={styles.link}>
            <button className={styles.button} onClick={goToLogin}>
              로그인
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

export default Signup;
