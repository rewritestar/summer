import React, { useEffect, useRef, useState } from "react";

import styles from "./mypage.module.css";
import Container from "../container/container";
import MypageButtons from "../buttons/mypage_buttons";
import TitleBar from "../title_bar/title_bar";
import { useNavigate } from "react-router-dom";

const Mypage = ({ auth, userProps, onChange, onwithDrawal }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(userProps);
  useEffect(() => {
    const tokenForm = localStorage.getItem("token");
    if (tokenForm.expiration < new Date()) {
      alert(
        "로그인 유효기한이 만료되어 로그아웃 되었습니다. 다시 한번 로그인해주세요."
      );
      navigate("/login");
    } else {
      auth
        .stayLogin(tokenForm) //
        .then((u) => {
          setUser(u);
        });
    }
  }, []);
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
    const id = user.id;
    const username = nameRef.current.value;
    const userpassword = passwordRef.current.value;
    const userpassword_check = password_checkRef.current.value;

    if (userpassword !== userpassword_check) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!window.confirm("회원정보를 정말로 바꾸시겠습니까?")) {
      return;
    }
    const mypageForm = { id, username, userpassword };
    onChange(mypageForm);
  };
  return (
    <Container>
      <TitleBar title="마이 페이지" />
      <div className={styles.form_container}>
        <p className={styles.subTitle}>- 회원 정보 수정 -</p>
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
              defaultValue={user && user.username}
            />
          </div>
          <div className={styles.password}>
            <span className={styles.title}>
              비밀번호
              <div className={styles.pw_info}>
                새로 바꿀 비밀번호, 혹은 원래 비밀번호를 입력해주세요.{" "}
              </div>
            </span>

            <input
              ref={passwordRef}
              className={styles.input}
              type="password"
              name="password"
              placeholder="비밀번호"
              onChange={handleChange}
              required
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
              required
            />
          </div>
          <p className={`${styles.password_word} ${style_color}`}>{text}</p>
          <section className={styles.buttons}>
            <div></div>
            <button type="submit" form="form" className={styles.submit_btn}>
              등록
            </button>
          </section>
        </form>
      </div>
      {user && <MypageButtons onwithDrawal={onwithDrawal} userid={user.id} />}
    </Container>
  );
};

export default Mypage;
