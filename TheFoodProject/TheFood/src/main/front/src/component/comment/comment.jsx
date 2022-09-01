import React, { useRef } from "react";
import Button from "../button/button";
import styles from "./comment.module.css";
const Comment = ({ user, comment, onCommentSubmit, onCommentDelete }) => {
  const containerRef = useRef();
  const inputRef = useRef();

  //댓글 수정 관련. 구현 못함
  const onCommentChange = (e) => {};
  const onSubmit = () => {
    onCommentSubmit(inputRef.current.value);
  };
  ///
  const onDelete = (e) => {
    onCommentDelete(comment.id);
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.bar}>
        <p className={styles.writer}>{`# ${comment.username}`}</p>
        {user.id === comment.userid && (
          <div className={styles.option_default}>
            <Button title="수정" onClick={onCommentChange} />
            <Button title="삭제" onClick={onDelete} />
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
