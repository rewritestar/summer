import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import styles from "./app.module.css";
import AboutUs from "./component/about_us/about_us";
import BoardDetail from "./component/board_detail/board_detail";
import BoardWrite from "./component/board_write/board_write";
import FindId from "./component/findId/findId";
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
  const user_id = localStorage.getItem("id"); //추후에 로그인 토큰으로 대체
  useEffect(() => {
    user_id && auth.stayLogin(user_id).then((user) => setUser(user));
  }, []);

  const navigate = useNavigate();
  const onMypageChange = (mypageForm) => {
    auth
      .mypageChange(mypageForm) //
      .then((u) => {
        localStorage.clear();
        localStorage.setItem("id", u.id);
        setUser(u);
        alert("회원 정보가 성공적으로 수정되었습니다!");
        window.location.href = "/";
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
          window.location.href = "/";
        });
    }
  };
  const onSignup = (signupForm) => {
    auth
      .signup(signupForm) //
      .then((u) => {
        alert("회원가입이 성공적으로 완료되었습니다!");
        setUser(u);
        window.location.href = "/";
      });
  };
  const onLogin = (loginForm) => {
    auth
      .login(loginForm)
      .then((u) => {
        localStorage.clear();
        localStorage.setItem("id", u.id);
        setUser(u);
      })
      .then(() => {
        alert("로그인이 성공적으로 완료 됐습니다.");
        window.location.href = "/";
      });
  };
  const onLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const onFindId = (useremail) => {
    auth
      .findId(useremail)
      .then((userid) => alert(`회원님의 아이디는 ${userid} 입니다.`));
  };
  const onFindPw = (findPwForm) => {
    console.log(findPwForm);
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
              goToFindId={goToFindId}
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
              goToFindId={goToFindId}
            />
          }
        />
        <Route
          path="/mypage"
          exact
          element={
            <Mypage
              auth={auth}
              onChange={onMypageChange}
              onwithDrawal={onwithDrawal}
            />
          }
        />
        <Route
          path="/myboards"
          exact
          element={<Myboards auth={auth} boardApi={boardApi} />}
        />
        <Route
          path="/findId"
          exact
          element={
            <FindId
              onFindId={onFindId}
              goToLogin={goToLogin}
              goToFindPw={goToFindPw}
            />
          }
        />
        <Route
          path="/findPw"
          exact
          element={
            <FindPw
              onFindPw={onFindPw}
              goToLogin={goToLogin}
              goToFindId={goToFindId}
            />
          }
        />
        <Route
          path="/boardwrite"
          exact
          element={<BoardWrite auth={auth} boardApi={boardApi} />}
        />
        <Route
          path="/boarddetail"
          exact
          element={<BoardDetail auth={auth} boardApi={boardApi} />}
        />
        <Route
          path="/recipe"
          exact
          element={<Recipe auth={auth} boardApi={boardApi} />}
        />
        <Route
          path="/restaurant"
          exact
          element={<Restaurant auth={auth} boardApi={boardApi} />}
        />
        <Route
          path="/free"
          exact
          element={<Free auth={auth} boardApi={boardApi} />}
        />
        <Route path="/aboutus" exact element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;
