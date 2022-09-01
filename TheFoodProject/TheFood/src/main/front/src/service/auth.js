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
      .catch((e) => console.log(`error login axios ${e}`));
    console.log(`첫번째 결과값 : ${response}`);
    // const result1 = await response.json();
    // console.log(`json 결과값 : ${result1}`);
    // const result2 = await response.text();
    // console.log(`text 결과값 : ${result2}`);
    return response.data;
  }
  async signup(signupForm) {
    const response = await this.auth
      .post("/api/signup/", signupForm)
      .catch(() => console.log("error signup axios"));
    console.log(`signup axios async 수행 ${response}`);
    return response.data;
  }
}

export default Auth;
