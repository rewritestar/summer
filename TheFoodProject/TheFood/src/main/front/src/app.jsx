import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./app.module.css";
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
function App({ auth, boardApi }) {
  const onMypageChange = (mypageForm) => {
    auth.mypageChange(mypageForm).then((user) => {
      localStorage.clear();
      localStorage.setItem("id", user.id);
    });
  };
  const onwithDrawal = (id) => {
    if (window.confirm("회원 탈퇴를 정말로 하시겠습니까?")) {
      auth //
        .withDrawal(id)
        .then(() => {
          alert("회원 탈퇴가 성공적으로 완료되었습니다!");
          localStorage.clear();
        })
        .then(() => (window.location.href = "/"));
    }
  };
  const onSignup = (signupForm) => {
    auth
      .signup(signupForm)
      .then(() => alert("회원가입이 성공적으로 완료되었습니다!"));
  };
  const onLogin = (loginForm) => {
    auth
      .login(loginForm)
      .then((user) => {
        localStorage.clear();
        localStorage.setItem("id", user.id);
      })
      .then(() => {
        alert("로그인이 성공적으로 완료 됐습니다.");
        window.location.href = "/";
      });
  };

  const onFindId = (useremail) => {
    auth
      .findId(useremail)
      .then((userid) => alert(`회원님의 아이디는 ${userid} 입니다.`));
  };
  const onFindPw = (findPwForm) => {
    console.log(findPwForm);
  };

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home auth={auth} />} />
          <Route path="/login" exact element={<Login onLogin={onLogin} />} />
          <Route
            path="/signup"
            exact
            element={<Signup onSignup={onSignup} />}
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
            element={<FindId onFindId={onFindId} />}
          />
          <Route
            path="/findPw"
            exact
            element={<FindPw onFindPw={onFindPw} />}
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
