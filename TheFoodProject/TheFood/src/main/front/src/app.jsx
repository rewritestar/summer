import { useRef } from "react";
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
        if (!u) {
          alert("이미 존재하는 회원입니다.");
        } else {
          alert("회원가입이 성공적으로 완료되었습니다!");
          navigate("/");
        }
      });
  };

  //로그인 유지
  const onStayLogin = (t, tokenExpireTime) => {
    const tokenForm = { token: t };
    auth
      .stayLogin(tokenForm) //
      .then((u) => {
        setUser(u);
        setToken(t);
        setTokenExpiration(tokenExpireTime);
      })
      .catch((e) => {
        console.log("token error: there is no token");
        setUser();
      });
  };

  //첫 로그인
  const onLogin = (loginForm) => {
    const tokenExpireTime = new Date(new Date().getTime() + 1000 * 60 * 30);
    auth
      .login(loginForm) //
      .then((t) => {
        if (!t) {
          alert("이메일 혹은 비밀번호를 다시 확인해주세요.");
        } else {
          const tokenLocal = { token: t, expiration: tokenExpireTime };
          localStorage.removeItem("token");
          localStorage.setItem("token", JSON.stringify(tokenLocal));
          onStayLogin(t, tokenExpireTime);
          alert("로그인이 성공적으로 완료 됐습니다.");
          navigate("/");
        }
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
    auth
      .findPw(findPwForm) //
      .then((res) => {
        if (!res) {
          alert(
            "해당하는 이메일의 회원이 없습니다! 이메일을 다시 한번 확인해주세요."
          );
        } else {
          //새로운 페이지로 이동시키는 게 좋을 듯
          alert(
            "고객님의 이메일로 임의로 발급된 비밀번호를 전송하였습니다! 확인해주시고, 해당 비밀번호로 로그인하신 후, 비밀번호를 변경해주세요!"
          );
          navigate("/login");
        }
      });
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
  //재접속 자동 로그인
  useEffect(() => {
    const localToken = JSON.parse(localStorage.getItem("token"));
    if (localToken) {
      const currentTokenExpiration = new Date(localToken.expiration);
      //유효 만료시간이 아직 남은 경우에만 로그인
      if (currentTokenExpiration > new Date()) {
        onStayLogin(localToken.token, currentTokenExpiration);
      }
    }
  }, []);

  //자동 로그아웃
  const logoutTimer = useRef();

  useEffect(() => {
    if (token && tokenExpiration) {
      const remainTime = tokenExpiration.getTime() - new Date().getTime();
      logoutTimer.current = setTimeout(onLogout, remainTime);
    } else {
      clearTimeout(logoutTimer.current);
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
        <Route path="/" exact element={<Home user={user} />} />
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
