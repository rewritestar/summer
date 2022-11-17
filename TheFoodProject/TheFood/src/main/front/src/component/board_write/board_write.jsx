import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./board_write.module.css";
const BoardWrite = ({ auth, boardApi }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [imgsrc, setImgsrc] = useState("");
  const [board, setBoard] = useState();
  const [countContent, setCountContent] = useState(0);
  const [loading, setLoading] = useState(false);

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
  const [user, setUser] = useState();
  useEffect(() => {
    const tokenForm = localStorage.getItem("token");
    if (!tokenForm) {
      alert("로그인이 필요한 기능입니다. 로그인을 해주세요.");
      navigate("/login");
      return;
    }
    if (new Date(tokenForm.expiration) < new Date()) {
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
  //게시글 수정할 때 발생함
  useEffect(() => {
    wroteBoard && setBoard(wroteBoard);
  }, [wroteBoard]);

  const goToHome = () => {
    navigate("/");
  };

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const id = board ? board.id : 0;
    const title = titleRef.current.value || "no title";
    const category =
      TYPE_CODE[categoryRef.current.value] || TYPE_CODE["레시피-한식"];
    const content = contentRef.current.value || "no content";
    const userid = user.id;
    const username = user.username;
    const date = board ? board.date : new Date();
    //
    const uploadedImg = await boardApi.onImgUpload(fileRef);

    console.log(uploadedImg);
    const filename = uploadedImg ? uploadedImg.original_filename : "noimage";
    const filepath = uploadedImg ? uploadedImg.url : "/images/noimage.png";
    const boardForm = {
      id,
      title,
      category,
      filename,
      filepath,
      content,
      userid,
      username,
      date,
    };
    boardApi //
      .boardWrite(boardForm) //
      .then((newBoard) => {
        setLoading(false);
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

  const handleContent = (e) => {
    const count = contentRef.current.value.length;
    const content = contentRef.current.value;
    if (count > 1000) {
      alert("글자수를 초과했습니다!");
      contentRef.current.value = content.substring(0, 1000);
    } else {
      setCountContent(count);
    }
  };
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <section className={styles.logo} onClick={goToHome}>
          <img className={styles.img} src="/images/logo.png" alt="logo"></img>
          <h1 className={styles.title}>The Food</h1>
        </section>
        {!loading && (
          <button type="submit" form="form" className={styles.button}>
            작성하기
          </button>
        )}
        {loading && <div className={styles.loading}></div>}
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
            >
              <option
                value={
                  board
                    ? Object.keys(TYPE_CODE).find(
                        (key) => TYPE_CODE[key] === board.category
                      )
                    : "none"
                }
                disabled
                selected
              >
                {board
                  ? Object.keys(TYPE_CODE).find(
                      (key) => TYPE_CODE[key] === board.category
                    )
                  : "-카테고리 선택-"}
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
            {imgsrc && <img className={styles.img_thumbnail} src={imgsrc} />}
            <textarea
              ref={contentRef}
              className={styles.textarea}
              placeholder="내용을 입력해주세요."
              defaultValue={board ? board.content : ""}
              onChange={handleContent}
            ></textarea>
            <p className={styles.content_count}>{countContent}/1000</p>
          </section>
        </form>
      </section>
    </div>
  );
};

export default BoardWrite;
