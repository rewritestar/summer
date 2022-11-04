import React, { useState } from "react";
import BoardList from "../board_list/board_list";
import Pagination from "../pagination/pagination";
import styles from "./page.module.css";

const Page = ({ boards }) => {
  const [limit, setLimit] = useState(8);
  const [pageNumber, setPageNumber] = useState(1);
  const offset = (pageNumber - 1) * limit;
  const handlePageNumber = (number) => {
    setPageNumber(number);
  };
  boards.sort((a, b) => {
    a = a.date ? new Date(a.date) : new Date(2001, 1, 1);
    b = b.date ? new Date(b.date) : new Date(2001, 1, 1);
    return a >= b ? -1 : 1;
  });
  return (
    <div className={styles.container}>
      <BoardList boards={boards.slice(offset, offset + limit)} />
      <Pagination
        boards_length={boards.length}
        limit={limit}
        handlePageNumber={handlePageNumber}
      />
    </div>
  );
};

export default Page;
