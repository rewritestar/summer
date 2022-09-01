import axios from "axios";

class Auth {
  constructor() {
    this.auth = axios.create({
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  async login(loginForm) {
    const response = await this.auth
      .post("/api/login/", loginForm)
      .catch(() => console.log("error login axios"));
    //   .catch((e) => console.log(`error login axios ${e}`));
    // console.log(`첫번째 결과값 : ${response}`);
    return response.data;
  }
  async signup(signupForm) {
    const response = await this.auth
      .post("/api/signup/", signupForm)
      .catch(() => console.log("error signup axios"));
    // console.log(`signup axios async 수행 ${response}`);
    return response.data;
  }
  async findId(useremail) {
    const response = await this.auth
      .post("/api/findid/", useremail)
      .catch(() => console.log("error findid axios"));
    // console.log(`signup axios async 수행 ${response}`);
    return response.data;
  }
  async mypageChange(mypageForm) {
    const response = await this.auth
      .post("/api/mypage/", mypageForm)
      .catch(() => console.log("error mypageChange axios"));
    // console.log(`signup axios async 수행 ${response}`);
    return response.data;
  }
}

export default Auth;
