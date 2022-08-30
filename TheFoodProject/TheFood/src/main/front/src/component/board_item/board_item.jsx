import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./board_item.module.css";

const BoardItem = ({ board }) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate("/boarddetail", { state: board });
  };
  return (
    <div className={styles.container} onClick={handleClick}>
      <img className={styles.thumbnail} src={board.filepath} alt="" />
      <div className={styles.data}>
        <p className={styles.title}>{board.title}</p>
        <p className={styles.username}>{board.userid}</p>
      </div>
    </div>
  );
};

export default BoardItem;
