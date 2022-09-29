import React, { useEffect, useRef, useState } from "react";
import Button from "../button/button";
import Comment from "../comment/comment";
import styles from "./comment_list.module.css";

const CommentList = ({ boardApi, board, boardid, user }) => {
  const inputRef = useRef();
  const formRef = useRef();

  const [comments, setComments] = useState([
    {
      id: 1,
      userid: "작성자1",
      username: "유저1",
      content: "한식에 대해서 배우게 되어서 좋아요!",
      boardid: 1,
    },
  ]);

  useEffect(() => {
    boardApi //
      .getComments(boardid) //
      .then((comments) => {
        setComments(comments);
        console.log("댓글 조회 성공");
      });
  }, []);

  //댓글 작성
  const onSubmit = () => {
    const content = inputRef.current.value;
    if (!user) {
      alert("로그인이 필요한 컨텐츠입니다.");
      formRef.current.reset();
      return;
    }
    onCommentSubmit(content);
  };
  const onCommentSubmit = (content) => {
    const commentForm = {
      id: 0,
      userid: user.id,
      username: user.username,
      content: content,
      boardid: board.id,
    };
    boardApi //
      .commentWrite(commentForm) //
      .then((comments) => {
        console.log(`댓글이 작성되었습니다.`);
        setComments(comments);
      });
    formRef.current.reset();
  };

  //댓글 수정
  const onCommentChange = (content, commentid) => {
    const commentForm = {
      id: commentid,
      userid: user.id,
      username: user.username,
      content: content,
      boardid: board.id,
    };
    boardApi //
      .commentWrite(commentForm) //
      .then((newComments) => {
        console.log(`댓글이 수정되었습니다.`);
        setComments(newComments);
      });

    formRef.current.reset();
  };

  //댓글 삭제
  const onCommentDelete = (commentid) => {
    boardApi //
      .commentDelte(commentid) //
      .then((newComments) => {
        console.log("댓글이 삭제되었습니다.");
        setComments(newComments);
      });
  };
  return (
    <div className={styles.comment_bar}>
      <div className={styles.titleAndButton}>
        <p className={styles.title}>comment</p>
        <Button title="등록" onClick={onSubmit} />
      </div>
      <form ref={formRef} className={styles.form} action="">
        <textarea
          ref={inputRef}
          className={styles.input}
          name=""
          id=""
          cols="30"
          rows="10"
        ></textarea>
      </form>
      <div className={styles.comments}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              user={user}
              comment={comment}
              onCommentDelete={onCommentDelete}
              onCommentChange={onCommentChange}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CommentList;
