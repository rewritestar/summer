import axios from "axios";

class BoardApi {
  constructor() {
    this.auth = axios.create({
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  async getRecipe(type) {
    const boards = await this.auth
      .post(`/api/recipe`, type)
      .catch((e) => console.log("error getRecipe axios"));
    return boards.data;
  }
  async getRestaurant(type) {
    const boards = await this.auth
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
  async write(boardForm) {
    const user = await this.auth
      .post(`/api/boardwrite`)
      .catch((e) => console.log("error write axios"));
    return user;
  }
}

export default BoardApi;
