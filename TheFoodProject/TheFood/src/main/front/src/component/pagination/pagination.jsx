import React from "react";
import styles from "./pagination.module.css";

const Pagination = ({ boards_length, limit, handlePageNumber }) => {
  const total_page = Math.ceil(boards_length / limit);
  return (
    <div className={styles.container}>
      {Array(total_page)
        .fill()
        .map((_, i) => {
          return (
            <button
              key={i}
              className={styles.button}
              onClick={() => {
                handlePageNumber(i + 1);
              }}
            >
              {i + 1}
            </button>
          );
        })}
    </div>
  );
};

export default Pagination;
