import axios from "axios";

class Auth {
  constructor() {
    this.auth = axios.create({
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  login = (loginForm) => {
    this.auth
      .post("/api/login/", loginForm)
      .then((res) => console.log(`login axios 성공 ${res}`))
      .catch((e) => console.log(`error login axios ${e}`));
  };
}

export default Auth;
