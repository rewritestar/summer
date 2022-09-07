import React, { useState } from "react";
import { useEffect } from "react";
import Container from "../container/container";
import Page from "../page/page";

const Free = ({ user, boardApi }) => {
  useEffect(() => {
    boardApi //
      .getFree()
      .then((boards) => setBoards(boards));
  }, []);
  return (
    <Container title="일상 카테고리" user={user}>
      <Page boards={boards} />
    </Container>
  );
};

export default Free;
