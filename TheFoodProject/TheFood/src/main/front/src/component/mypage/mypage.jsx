import React, { useEffect, useRef, useState } from "react";

import styles from "../user_component.module.css";
import Container from "../container/container";
import MypageButtons from "../buttons/mypage_buttons";
import { useNavigate } from "react-router-dom";

const Mypage = ({ auth, onChange, onwithDrawal }) => {
  const [user, setUser] = useState();

  const user_id = localStorage.getItem("id"); //추후에 로그인 토큰으로 대체
  useEffect(() => {
    user_id && auth.stayLogin(user_id).then((user) => setUser(user));
  }, [user_id]);

  const navigate = useNavigate();
  const formRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const password_checkRef = useRef();
  const [check, setCheck] = useState({
    password: "",
    password_check: "",
  });
  const [word, setWord] = useState({
    text: "",
    color: "pink",
  });
  const style_color = word.color === "pink" ? styles.pink : styles.green;

  const { password, password_check } = check;
  const { text, color } = word;
  useEffect(() => {
    checkPw();
  }, [check]);
  useEffect(() => {});

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
    console.log("onsubmit");
    const userid = user.id;
    const username = nameRef.current.value;
    const userpassword = passwordRef.current.value;
    const userpassword_check = password_checkRef.current.value;
    if (userpassword !== userpassword_check) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    const mypageForm = { userid, username, userpassword };
    console.log(mypageForm);
    onChange(mypageForm);
    navigate("/");
  };
  return (
    <Container title="마이 페이지" user={user}>
      <div className={styles.form_container}>
        <p className={styles.subTitle}>회원 정보 수정</p>
        <form
          ref={formRef}
          className={styles.form}
          id="form"
          onSubmit={onSubmit}
        >
          <div className={styles.nickname}>
            <span className={styles.title}>닉네임</span>
            <input
              ref={nameRef}
              className={styles.input}
              type="text"
              name="nickname"
              placeholder="닉네임"
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
              onChange={handleChange}
            />
          </div>
          <p className={`${styles.password_word} ${style_color}`}>{text}</p>
        </form>
        <section className={styles.buttons}>
          <div></div>
          <button type="submit" form="form" className={styles.submit_btn}>
            등록
          </button>
        </section>
      </div>
      <MypageButtons onwithDrawal={onwithDrawal} />
    </Container>
  );
};

export default Mypage;
