import axios from "axios";

class BoardApiTest {
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
    const boards = [
      {
        id: 1,
        category: "레시피-한식",
        title: "요즘 한식에 관심이 생겼어요!",
        content: `원대하고 그들은 피가 더운지라 실현에 대한 자신과 용기가 있다 그러므로 그들은 이상의 보배를 능히 품으며 그들의 이상은 아름답고 소담스러운 열매를 맺어 우리 인생을 풍부하게 하는 것이다 보라 청춘을 ! 그들의 몸이 얼마나 튼튼하며 그들의 피부가 얼마나 생생하며 그들의 눈에 무엇이 타오르고 있는가? 우리 눈이 그것을 보는 때에 우리의 귀는 생의 찬미를 듣는다 그것은 웅대한 관현악이며 미묘한 교향악이다 뼈 끝에 스며들어 가는 열락의 소리다이것은 피어나기 전인 유소년에게서 구하지 못할 바이며 시들어 가는 노년에게서 구하지 못할 바이며 오직 우리 청춘에서만 구할 수 있는 것이다 청춘은 인생의 황금시대다

      장식하는 천자만홍이 어디 있으며 인생을 풍부하게 하는 온갖 과실이 어디 있으랴? 이상! 우리의 청춘이 가장 많이 품고 있는 이상! 이것이야말로 무한한 가치를 가진 것이다 사람은 크고 작고 간에 이상이 있음으로써 용감하고 굳세게 살 수 있는 것이다 석가는 무엇을 위하여 설산에서 고행을 하였으며 예수는 무엇을 위하여 광야에서 방황하였으며 공자는 무엇을 위하여 천하를 철환하였는가? 밥을 위하여서 옷을 위하여서 미인을 구하기 위하여서 그리하였는가? 아니다 그들은 커다란 이상 곧 만천하의 대중을 품에 안고 그들에게 밝은 길을 찾아 주며 그들을 행복스럽고 평화스러운 곳으로 인도하겠다는 커다란 이상을 품었기 때문이다 그러므로 그들은 길지 아니한 목숨을 사는가 싶이 살았으며 그들의 그림자는 천고에 사라지지 않는 것이다 이것은 현저하게 일월과 같은 예가 되려니와 그와 같지 못하다 할지라도 창공에 반짝이는 뭇 별과 같이 산야에 피어나는 군영과 같이 이상은 실로 인간의 부패를 방지하는 소금이라 할지니 인생에 가치를`,
        filename: "파일이름1",
        filepath: "./images/logo.png",
        user_id: 1,
        username: "작성자1",
      },
    ];
    console.log(user_id);
    return boards;
  }
  async getMyBoards(user_id) {
    const boards = [
      {
        id: 1,
        category: "레시피-한식",
        title: "요즘 한식에 관심이 생겼어요!",
        content: `원대하고 그들은 피가 더운지라 실현에 대한 자신과 용기가 있다 그러므로 그들은 이상의 보배를 능히 품으며 그들의 이상은 아름답고 소담스러운 열매를 맺어 우리 인생을 풍부하게 하는 것이다 보라 청춘을 ! 그들의 몸이 얼마나 튼튼하며 그들의 피부가 얼마나 생생하며 그들의 눈에 무엇이 타오르고 있는가? 우리 눈이 그것을 보는 때에 우리의 귀는 생의 찬미를 듣는다 그것은 웅대한 관현악이며 미묘한 교향악이다 뼈 끝에 스며들어 가는 열락의 소리다이것은 피어나기 전인 유소년에게서 구하지 못할 바이며 시들어 가는 노년에게서 구하지 못할 바이며 오직 우리 청춘에서만 구할 수 있는 것이다 청춘은 인생의 황금시대다

      장식하는 천자만홍이 어디 있으며 인생을 풍부하게 하는 온갖 과실이 어디 있으랴? 이상! 우리의 청춘이 가장 많이 품고 있는 이상! 이것이야말로 무한한 가치를 가진 것이다 사람은 크고 작고 간에 이상이 있음으로써 용감하고 굳세게 살 수 있는 것이다 석가는 무엇을 위하여 설산에서 고행을 하였으며 예수는 무엇을 위하여 광야에서 방황하였으며 공자는 무엇을 위하여 천하를 철환하였는가? 밥을 위하여서 옷을 위하여서 미인을 구하기 위하여서 그리하였는가? 아니다 그들은 커다란 이상 곧 만천하의 대중을 품에 안고 그들에게 밝은 길을 찾아 주며 그들을 행복스럽고 평화스러운 곳으로 인도하겠다는 커다란 이상을 품었기 때문이다 그러므로 그들은 길지 아니한 목숨을 사는가 싶이 살았으며 그들의 그림자는 천고에 사라지지 않는 것이다 이것은 현저하게 일월과 같은 예가 되려니와 그와 같지 못하다 할지라도 창공에 반짝이는 뭇 별과 같이 산야에 피어나는 군영과 같이 이상은 실로 인간의 부패를 방지하는 소금이라 할지니 인생에 가치를`,
        filename: "파일이름1",
        filepath: "./images/logo.png",
        user_id: 1,
        username: "작성자1",
      },
    ];
    console.log(user_id);
    return boards;
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
}

export default BoardApiTest;
