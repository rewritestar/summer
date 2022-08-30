import React from "react";
import BoardItem from "../board_item/board_item";
import styles from "./board_list.module.css";
const BoardList = ({ boards }) => (
  <div className={styles.container}>
    {boards.map((board) => {
      return <BoardItem key={board.id} board={board} />;
    })}
  </div>
);

export default BoardList;
