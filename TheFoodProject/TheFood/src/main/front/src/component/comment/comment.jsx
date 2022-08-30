import React, { useRef, useState } from "react";
import Button from "../button/button";
import styles from "./comment.module.css";
const Comment = ({ user, comment, onCommentSubmit }) => {
  const containerRef = useRef();
  const inputRef = useRef();
  const onCommentChange = (e) => {};
  const onCommentDelete = (e) => {};
  const onSubmit = () => {
    onCommentSubmit(inputRef.current.value);
  };
  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.bar}>
        <p className={styles.writer}>{`# ${comment.username}`}</p>
        {user.id === comment.userid && (
          <div className={styles.option_default}>
            <Button title="수정" onClick={onCommentChange} />
            <Button title="삭제" onClick={onCommentDelete} />
          </div>
        )}
      </div>
      <p className={styles.text}>{comment.content} </p>
    </div>
  );
  // <div ref={containerRef} className={styles.container}>
  //     <div className={styles.bar}>
  //       <p className={styles.writer}>{`# ${comment.username}`}</p>
  //       {user.id === comment.userid && (
  //         <div className={styles.option_default}>
  //           <Button title="등록" onClick={onSubmit} />
  //         </div>
  //       )}
  //     </div>
  //     <textarea
  //       ref={inputRef}
  //       className={styles.input}
  //       defaultValue={comment.content}
  //     />
  //   </div>
};

export default Comment;
