import axios from "axios";

class AuthTest {
  constructor() {
    this.auth = axios.create({
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  async login(loginForm) {
    const tokenForm = {
      token: "12345",
      expiration: "1800000",
    };
    const newExpiration = new Date(
      new Date().getTime() + parseInt(tokenForm.expiration)
    );
    tokenForm.expiration = newExpiration;
    return tokenForm;
  }
  async signup(signupForm) {
    console.log(signupForm);
  }
  async withDrawal(id) {
    this.auth
      .post("/api/withdrawal/", parseInt(id))
      .catch((e) => console.log(`error withDrawal axios ${e}`));
  }
  async findPw(findPwForm) {
    const response = await this.auth
      .post("/api/findpw/", findPwForm)
      .catch(() => console.log("error findpw axios"));
    return response.data;
  }
  async mypageChange(mypageForm) {
    // const response = await this.auth
    //   .post("/api/mypage/", mypageForm)
    //   .catch(() => console.log("error mypageChange axios"));
    // return response.data;
    console.log(mypageForm);
    const tokenUser = {
      id: "1",
      useremail: "rewritestar@naver.com",
      username: "진짜조인미",
    };
    return tokenUser;
  }

  async stayLogin(tokenForm) {
    console.log(tokenForm);
    const tokenUser = {
      id: "3",
      useremail: "rewritestar@naver.com",
      username: "진짜조인미",
    };
    return tokenUser;
  }
}

export default AuthTest;
