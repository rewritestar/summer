import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../footer/footer";
import styles from "./board_write.module.css";
const BoardWrite = ({ user, boardApi }) => {
  const [board, setBoard] = useState({
    id: "",
    title: "",
    category: "",
    filepath: "",
    filename: "",
    content: "",
    userid: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const wroteBoard = location.state || "";
  const goToHome = () => {
    navigate("/");
  };
  const categoryRef = useRef();
  const titleRef = useRef();
  const fileRef = useRef();
  const contentRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    const id = "";
    const title = titleRef.current.value;
    const category = categoryRef.current.value;
    const filename = fileRef.current.files[0]
      ? fileRef.current.files[0].name
      : "Default";
    const filepath = `images/${filename}` || "images/logo.png";
    const content = contentRef.current.value;
    const userid = user.id;
    const boardForm = {
      id,
      title,
      category,
      filename,
      filepath,
      content,
      userid,
    };
    boardApi //
      .write(boardForm) //
      .then((user) => `게시글 작성 성공 ${user}`);
    //board category에 따라 백엔드로 주는 방향 달라짐
  };
  useEffect(() => {
    //게시글 수정할 때 발생함
    wroteBoard && setBoard(wroteBoard);
  }, [location.state]);
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <section className={styles.logo} onClick={goToHome}>
          <img className={styles.icon} src="/images/logo.png" alt="logo"></img>
          <h1 className={styles.title}>The Food</h1>
        </section>
        <button type="submit" form="form" className={styles.button}>
          작성하기
        </button>
      </header>
      <section className={styles.content}>
        <form className={styles.form} id="form" onSubmit={onSubmit}>
          <section className={styles.titles}>
            <p className={styles.title}>title</p>
            <input
              ref={titleRef}
              className={styles.input}
              type="text"
              placeholder="제목을 입력해주세요"
              defaultValue={board.title}
            />
          </section>
          <section className={styles.selector}>
            <select
              ref={categoryRef}
              className={styles.category}
              name="category"
              defaultValue={board.category}
            >
              <option value="none" disabled>
                -카테고리 선택-
              </option>
              <option value="레시피-한식">레시피-한식</option>
              <option value="레시피-양식">레시피-양식</option>
              <option value="레시피-아시안식">레시피-아시안식</option>
              <option value="레시피-디저트">레시피-디저트</option>
              <option value="레시피-음료">레시피-음료</option>
              <option value="레시피-다이어트">레시피-다이어트</option>
              <option value="레시피-비건">레시피-비건</option>
              <option value="레시피-야식">레시피-야식</option>
              <option value="레시피-기타">레시피-기타</option>
              <option value="맛집-수도권">맛집-수도권</option>
              <option value="맛집-충북/충남/대전">맛집-충북/충남/대전</option>
              <option value="맛집-전북/전남/광주">맛집-전북/전남/광주</option>
              <option value="맛집-경북/대구">맛집-경북/대구</option>
              <option value="맛집-경남/부산/울산">맛집-경남/부산/울산</option>
              <option value="맛집-강원">맛집-강원</option>
              <option value="맛집-제주">맛집-제주</option>
              <option value="맛집-기타">맛집-수도권</option>
              <option value="일상">일상 게시판</option>
            </select>
            <input
              ref={fileRef}
              className={styles.file}
              type="file"
              accept="image/*"
              defaultValue={board.filename}
            />
          </section>
          <section className={styles.text}>
            <textarea
              ref={contentRef}
              className={styles.textarea}
              placeholder="내용을 입력해주세요."
              defaultValue={board.content}
            ></textarea>
          </section>
        </form>
      </section>
      <div className={styles.footer}>
        <Footer display="row" />
      </div>
    </div>
  );
};

export default BoardWrite;
