import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import styles from "./app.module.css";
import AboutUs from "./component/about_us/about_us";
import BoardDetail from "./component/board_detail/board_detail";
import BoardWrite from "./component/board_write/board_write";
import FindPw from "./component/findPw/findPw";
import Free from "./component/free/free";
import Home from "./component/home/home";
import Login from "./component/login/login";
import Myboards from "./component/myboards/myboards";
import Mypage from "./component/mypage/mypage";
import Recipe from "./component/recipe/recipe";
import Restaurant from "./component/restaurant/restaurant";
import Signup from "./component/signup/signup";
import UserBtn from "./component/user_btn/user_btn";
function App({ auth, boardApi }) {
  const [user, setUser] = useState();
  const [tokenExpiration, setTokenExpiration] = useState();
  const [token, setToken] = useState();
  const localToken = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (localToken) {
      const currentTokenExpiration = new Date(localToken.expiration);
      const tokenForm = { token: localToken.token };
      console.log(tokenForm);
      auth
        .stayLogin(tokenForm) //
        .then((user) => {
          console.log(user);
          setUser(user);
          setToken(localToken.token);
          setTokenExpiration(currentTokenExpiration);
        })
        .catch((e) => {
          console.log("token error: there is no token");
          setUser();
        });
    }
  }, [token]);

  const navigate = useNavigate();
  const onMypageChange = (mypageForm) => {
    auth
      .mypageChange(mypageForm) //
      .then((u) => {
        setUser(u);
        alert("회원 정보가 성공적으로 수정되었습니다!");
        navigate("/");
      });
  };
  const onwithDrawal = (id) => {
    if (window.confirm("회원 탈퇴를 정말로 하시겠습니까?")) {
      auth //
        .withDrawal(id)
        .then((_) => {
          alert("회원 탈퇴가 성공적으로 완료되었습니다!");
          localStorage.clear();
          setUser();
          navigate("/");
        });
    }
  };
  const onSignup = (signupForm) => {
    auth
      .signup(signupForm) //
      .then((u) => {
        alert("회원가입이 성공적으로 완료되었습니다!");
        setUser(u);
        navigate("/");
      });
  };
  const onLogin = (loginForm) => {
    const tokenExpireTime = new Date(new Date().getTime() + 1000 * 15);
    auth
      .login(loginForm)
      .then((token) => {
        const tokenLocal = { token, expiration: tokenExpireTime };
        localStorage.removeItem("token");
        localStorage.setItem("token", JSON.stringify(tokenLocal));
        setTokenExpiration(tokenExpireTime);
        setToken(token);
      })
      .then(() => {
        alert("로그인이 성공적으로 완료 됐습니다.");
        navigate("/");
      });
  };

  const onLogout = () => {
    alert("로그아웃 되었습니다.");
    localStorage.removeItem("token");
    setToken(null);
    setTokenExpiration(null);
    setUser(null);
    navigate("/");
  };

  const onFindPw = (findPwForm) => {
    auth.findPw(findPwForm);
  };

  const goToLogin = () => {
    navigate("/login");
  };
  const goToSignup = () => {
    navigate("/signup");
  };
  const goToFindId = () => {
    navigate("/findId");
  };
  const goToFindPw = () => {
    navigate("/findPw");
  };
  const goToMypage = () => {
    navigate("/mypage");
  };

  let logoutTimer;
  useEffect(() => {
    console.log(`token 있나? ${token}`);
    console.log(`expiration time: ${tokenExpiration}`);
    if (token && tokenExpiration) {
      const remainTime = tokenExpiration.getTime() - new Date().getTime();
      console.log(`remaintime: ${remainTime}`);
      logoutTimer = setTimeout(onLogout, remainTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [tokenExpiration]);

  return (
    <div className={styles.app}>
      <UserBtn
        user={user}
        goToLogin={goToLogin}
        goToSignup={goToSignup}
        goToMypage={goToMypage}
        onLogout={onLogout}
      />
      <Routes>
        <Route path="/" exact element={<Home auth={auth} />} />
        <Route
          path="/login"
          exact
          element={
            <Login
              onLogin={onLogin}
              goToSignup={goToSignup}
              goToFindPw={goToFindPw}
            />
          }
        />
        <Route
          path="/signup"
          exact
          element={
            <Signup
              onSignup={onSignup}
              goToLogin={goToLogin}
              goToFindPw={goToFindPw}
            />
          }
        />
        <Route
          path="/mypage"
          exact
          element={
            <Mypage
              user={user}
              onChange={onMypageChange}
              onwithDrawal={onwithDrawal}
            />
          }
        />
        <Route
          path="/myboards"
          exact
          element={<Myboards user={user} boardApi={boardApi} />}
        />
        <Route
          path="/findPw"
          exact
          element={
            <FindPw
              onFindPw={onFindPw}
              goToLogin={goToLogin}
              goToSignup={goToSignup}
            />
          }
        />
        <Route
          path="/boardwrite"
          exact
          element={<BoardWrite user={user} boardApi={boardApi} />}
        />
        <Route
          path="/boarddetail"
          exact
          element={<BoardDetail user={user} boardApi={boardApi} />}
        />
        <Route
          path="/recipe"
          exact
          element={<Recipe user={user} boardApi={boardApi} />}
        />
        <Route
          path="/restaurant"
          exact
          element={<Restaurant user={user} boardApi={boardApi} />}
        />
        <Route
          path="/free"
          exact
          element={<Free user={user} boardApi={boardApi} />}
        />
        <Route path="/aboutus" exact element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;
