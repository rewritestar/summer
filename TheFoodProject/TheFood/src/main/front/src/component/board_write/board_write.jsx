import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./board_write.module.css";
const BoardWrite = ({ auth, boardApi }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const user_id = localStorage.getItem("id"); //추후에 로그인 토큰으로 대체

  const [user, setUser] = useState();
  const [imgsrc, setImgsrc] = useState("");
  const [board, setBoard] = useState();

  const wroteBoard = location.state || "";

  const categoryRef = useRef();
  const titleRef = useRef();
  const fileRef = useRef();
  const contentRef = useRef();

  const TYPE_CODE = {
    "레시피-한식": 101,
    "레시피-양식": 102,
    "레시피-아시안식": 103,
    "레시피-디저트": 104,
    "레시피-음료": 105,
    "레시피-다이어트": 106,
    "레시피-비건": 107,
    "레시피-야식": 108,
    "레시피-기타": 109,
    "맛집-수도권": 201,
    "맛집-충북/충남/대전": 202,
    "맛집-전북/전남/광주": 203,
    "맛집-경북/대구": 204,
    "맛집-경남/부산/울산": 205,
    "맛집-강원": 206,
    "맛집-제주": 207,
    "맛집-기타": 208,
    일상게시판: 300,
  };

  useEffect(() => {
    if (user_id) {
      auth.stayLogin(user_id).then((user) => setUser(user));
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [user_id]);

  //게시글 수정할 때 발생함
  useEffect(() => {
    wroteBoard && setBoard(wroteBoard);
  }, [wroteBoard]);

  const goToHome = () => {
    navigate("/");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const id = board ? board.id : 0;
    const title = titleRef.current.value || "no title";
    const category = TYPE_CODE[categoryRef.current.value];
    const filename = fileRef.current.files[0]
      ? fileRef.current.files[0].name
      : "noimage.png";
    const filepath = `images/${filename}` || "/images/noimage.png";
    const content = contentRef.current.value || "no content";
    const userid = user.id;
    const username = user.username;
    const boardForm = {
      id,
      title,
      category,
      filename,
      filepath,
      content,
      userid,
      username,
    };
    // const formdata = new FormData();
    // formdata.append("file", fileRef.current.files[0]);
    boardApi //
      .boardWrite(boardForm) //
      .then((newBoard) => {
        console.log(newBoard);
        alert(`게시글 작성에 성공했습니다!`);
        navigate("/boarddetail", { state: newBoard });
      });
  };

  //이미지 미리보기
  const onImgChange = (e) => {
    const imgTarget = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imgTarget);
    fileReader.onload = (e) => {
      setImgsrc(e.target.result);
    };
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <section className={styles.logo} onClick={goToHome}>
          <img className={styles.img} src="/images/logo.png" alt="logo"></img>
          <h1 className={styles.title}>The Food</h1>
        </section>
        <button type="submit" form="form" className={styles.button}>
          작성하기
        </button>
      </header>
      <section className={styles.content}>
        <form className={styles.form} id="form" onSubmit={onSubmit}>
          <section className={styles.titles}>
            <input
              ref={titleRef}
              className={styles.input}
              type="text"
              placeholder="제목을 입력해주세요"
              defaultValue={board ? board.title : ""}
            />
          </section>
          <section className={styles.selector}>
            <select
              ref={categoryRef}
              className={styles.category}
              name="category"
              defaultValue={board ? board.category : ""}
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
              <option value="일상게시판">일상게시판</option>
            </select>

            <input
              ref={fileRef}
              className={styles.file}
              type="file"
              accept="image/*"
              defaultValue={board ? board.filename : ""}
              onChange={onImgChange}
            />
          </section>
          <section className={styles.text}>
            {imgsrc && <img src={imgsrc} />}
            <textarea
              ref={contentRef}
              className={styles.textarea}
              placeholder="내용을 입력해주세요."
              defaultValue={board ? board.content : ""}
            ></textarea>
          </section>
        </form>
      </section>
    </div>
  );
};

export default BoardWrite;
