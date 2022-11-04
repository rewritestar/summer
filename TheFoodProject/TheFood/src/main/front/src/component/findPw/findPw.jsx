import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../container/container";
import styles from "./findPw.module.css";
import TitleBar from "../title_bar/title_bar";

const FindPw = ({ onFindPw, goToLogin, goToSignup }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formRef = useRef();
  const emailRef = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("waiting....");
    const useremail = emailRef.current.value;
    const findPwForm = { useremail };
    //백엔드 처리 기다림
    onFindPw(findPwForm) //
      .then((result) => {
        setLoading(false);
        console.log("finshed!");
        console.log(result);
        if (!result.data) {
          alert(
            "해당하는 이메일의 회원이 없습니다! 이메일을 다시 한번 확인해주세요."
          );
        } else {
          alert(
            "고객님의 이메일로 임의로 발급된 비밀번호를 전송하였습니다! 확인해주시고, 해당 비밀번호로 로그인하신 후, 비밀번호를 변경해주세요."
          );
          navigate("/login");
        }
      });
  };

  return (
    <Container>
      <TitleBar title="비밀번호 찾기" />
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
              type="text"
              name="email"
              placeholder="이메일"
            />
          </div>
          <section className={styles.buttons}>
            <span className={styles.link}>
              <button className={styles.button} onClick={goToLogin}>
                로그인
              </button>
              <button className={styles.button} onClick={goToSignup}>
                회원가입 하기
              </button>
            </span>
            {!loading && (
              <button type="submit" form="form" className={styles.submit_btn}>
                등록
              </button>
            )}
            {loading && <div className={styles.loading}></div>}
          </section>
        </form>
      </div>
    </Container>
  );
};

export default FindPw;
