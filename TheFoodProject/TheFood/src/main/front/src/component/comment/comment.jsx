import React, { useRef, useState } from "react";
import Button from "../button/button";
import styles from "./comment.module.css";
const Comment = ({ user, comment, onCommentDelete, onCommentChange }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef();

  //댓글 수정 모드
  const handleChange = (e) => {
    setInput(comment.content);
  };

  //댓글 수정 작성
  const handleSubmit = () => {
    onCommentChange(inputRef.current.value, comment.id);
    setInput("");
  };

  //댓글 삭제
  const handleDelete = (e) => {
    onCommentDelete(comment.id);
  };

  //댓글 수정 취소
  const handleBack = (e) => {
    setInput("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <p className={styles.writer}>{`# ${comment.username}`}</p>
        {user && user.id === comment.userid && !input && (
          <div className={styles.option_default}>
            <Button title="수정" onClick={handleChange} />
            <Button title="삭제" onClick={handleDelete} />
          </div>
        )}
        {input && (
          <div className={styles.option_default}>
            <Button title="등록" onClick={handleSubmit} />
            <Button title="취소" onClick={handleBack} />
          </div>
        )}
      </div>

      {input ? (
        <textarea
          ref={inputRef}
          className={styles.input}
          defaultValue={input}
          cols="30"
          rows="10"
        />
      ) : (
        <p className={styles.text}>{comment.content} </p>
      )}
    </div>
  );
};

export default Comment;
