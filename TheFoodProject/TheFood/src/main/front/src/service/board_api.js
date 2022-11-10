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
    if (type === 100) {
      const boards = await this.boardApi
        .get(`/api/recipe/all`)
        .catch((e) => console.log("error getRecipe axios"));
      return boards.data;
    } else {
      const boards = await this.boardApi
        .post(`/api/recipe`, type)
        .catch((e) => console.log("error getRecipe axios"));
      return boards.data;
    }
  }
  async getRestaurant(type) {
    if (type === 200) {
      const boards = await this.boardApi
        .get(`/api/restaurant/all`)
        .catch((e) => console.log("error getRestaurant axios"));
      return boards.data;
    } else {
      const boards = await this.boardApi
        .post(`/api/restaurant`, type)
        .catch((e) => console.log("error getRestaurant axios"));
      return boards.data;
    }
  }
  async getFree() {
    const boards = await axios
      .get(`/api/free`)
      .catch((e) => console.log("error getFree axios"));
    console.log(boards);
    return boards.data;
  }
  async boardWrite(boardForm) {
    const board = await this.boardApi
      .post(`/api/boardwrite`, boardForm)
      .catch((e) => console.log("error boardWrite axios"));
    return board.data;
  }
  async boardDelete(boardid) {
    this.boardApi
      .post(`/api/boarddelete`, boardid)
      .catch((e) => console.log("error boardDelete axios"));
  }

  //마이페이지 댓글, 게시글 조회 관련
  async getMyCommentBoards(user_id) {
    const boards = await this.boardApi
      .post(`/api/myboards/comments`, user_id)
      .catch((e) => console.log("error getMyCommentsBoard axios"));
    return boards.data;
  }
  async getMyBoards(user_id) {
    console.log(user_id);
    const boards = await this.boardApi
      .post(`/api/myboards/boards`, user_id)
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
  async commentWrite(commentForm) {
    const comments = await this.boardApi
      .post(`/api/commentwrite`, commentForm)
      .catch((e) => console.log("error commentWrite axios"));
    return comments.data;
  }
  async commentDelte(id) {
    console.log(id);
    const comments = await this.boardApi
      .post(`/api/commentDelete`, id)
      .catch((e) => console.log("error commentDelete axios"));
    return comments.data;
  }

  async onImgUpload(fileRef) {
    if (!fileRef.current.files[0]) {
      return;
    }
    const file = fileRef.current.files[0];
    const formData = new FormData();
    const cloudName = "dtikdam3i"; //보안 처리 필요함
    formData.append("file", file);
    formData.append("upload_preset", "the-food-board-img");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const uploaded = await res.json();
    return uploaded;
  }
}

export default BoardApi;
