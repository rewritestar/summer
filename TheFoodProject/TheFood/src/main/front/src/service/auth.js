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
    return response.data;
  }
  async signup(signupForm) {
    const response = await this.auth
      .post("/api/signup/", signupForm)
      .catch(() => console.log("error signup axios"));
    return response.data;
  }
  async withDrawal(id) {
    this.auth
      .post("/api/withdrawal/", parseInt(id))
      .catch((e) => console.log(`error withDrawal axios ${e}`));
  }
  async findId(findIdForm) {
    console.log(`useremail: ${findIdForm} and type ${typeof findIdForm}`);
    console.log(findIdForm);
    const response = await this.auth
      .post("/api/findid/", findIdForm)
      .catch(() => console.log("error findid axios"));
    return response.data;
  }
  async mypageChange(mypageForm) {
    const response = await this.auth
      .post("/api/mypage/", mypageForm)
      .catch(() => console.log("error mypageChange axios"));
    return response.data;
  }

  async stayLogin(tokenForm) {
    const token = await this.auth
      .post("/api/staylogin/", tokenForm)
      .catch(() => console.log("error stayLogin axios"));
    return token.data;
  }
}

export default Auth;
