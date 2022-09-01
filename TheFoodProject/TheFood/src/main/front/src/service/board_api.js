import axios from "axios";

class BoardApi {
  constructor() {
    this.boardApi = axios.create({
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  //게시물 관련
  async getRecipe(type) {
    const boards = await this.boardApi
      .post(`/api/recipe`, type)
      .catch((e) => console.log("error getRecipe axios"));
    return boards.data;
  }
  async getRestaurant(type) {
    const boards = await this.boardApi
      .post(`/api/restaurant`, type)
      .catch((e) => console.log("error getRestaurant axios"));
    return boards.data;
  }
  async getFree() {
    const boards = axios
      .get(`/api/free`)
      .catch((e) => console.log("error getFree axios"));
    return boards.data;
  }
  async boardWrite(boardForm) {
    const user = await this.boardApi
      .post(`/api/boardwrite`, boardForm)
      .catch((e) => console.log("error boardWrite axios"));
    return user;
  }
  async boardDelete(boardid) {
    this.boardApi
      .post(`/api/boarddelete`, boardid)
      .catch((e) => console.log("error boardDelete axios"));
  }

  //마이페이지 댓글, 게시글 조회 관련
  async getMyCommentBoards(userid) {
    const boards = await this.boardApi
      .post(`/api/myboards/comments`, userid)
      .catch((e) => console.log("error getMyCommentsBoard axios"));
    return boards.data;
  }
  async getMyBoards(userid) {
    const boards = await this.boardApi
      .post(`/api/myboards/boards`, userid)
      .catch((e) => console.log("error getMyBoards axios"));
    return boards.data;
  }

  // 댓글 관련
  async getComments(boardid) {
    const comments = await this.boardApi
      .post(`/api/getcomments`, boardid)
      .catch((e) => console.log("error getComments axios"));
    return comments.data;
  }
  async commentWrite(comment) {
    this.boardApi
      .post(`/api/commentwrite`, comment)
      .catch((e) => console.log("error commentWrite axios"));
  }
}

export default BoardApi;
