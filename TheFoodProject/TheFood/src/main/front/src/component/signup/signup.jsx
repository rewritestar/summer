import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../container/container";
import styles from "./signup.module.css";
import TitleBar from "../title_bar/title_bar";

const Signup = ({ onSignup, goToLogin, goToFindPw }) => {
  const navigate = useNavigate();

  const formRef = useRef();
  const passwordRef = useRef();
  const password_checkRef = useRef();
  const email1Ref = useRef();
  const email2Ref = useRef();
  const nameRef = useRef();

  const [inputEdit, setInputEdit] = useState(false);
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
    const userpassword = passwordRef.current.value;
    const userpassword_check = password_checkRef.current.value;
    const useremail = `${email1Ref.current.value}@${email2Ref.current.value}`;
    const username = nameRef.current.value;
    if (userpassword !== userpassword_check) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    const signupForm = { userpassword, useremail, username };

    onSignup(signupForm);
  };

  const handleSelect = (e) => {
    const value = e.target.value;
    if (value === "none") {
      setInputEdit(true);
      email2Ref.current.value = "";
    } else {
      setInputEdit(false);
      email2Ref.current.value = value;
    }
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
          <div className={styles.email}>
            <span className={styles.title}>이메일</span>
            <div className={styles.inputContainer}>
              <input
                ref={email1Ref}
                className={styles.input}
                type="text"
                name="email1"
                placeholder="이메일"
                required
              />
              <p className={styles.at}>@</p>
              <input
                ref={email2Ref}
                className={styles.input}
                type="text"
                name="email2"
                placeholder="이메일"
                readOnly={inputEdit ? false : true}
                required
              />
              <select onChange={handleSelect}>
                <option value="">선택하세요</option>
                <option value="naver.com">naver.com</option>
                <option value="nate.com">nate.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="yahoo.com">yahoo.com</option>
                <option value="hotmail.com">hanmail.net</option>
                <option value="hanmail.net">hanmail.net</option>
                <option value="none">직접입력</option>
              </select>
            </div>
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
        </form>
      </div>
    </Container>
  );
};

export default Signup;
