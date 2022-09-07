import { useState } from "react";
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
  const [user, setUser] = useState({
    id: "",

    userid: "",

    useremail: "",

    userpassword: "",

    username: "",

    enabled: "",
  });
  const onMypageChange = (mypageForm) => {
    auth.mypageChange(mypageForm).then((user) => {
      setUser(user);
    });
  };
  const onwithDrawal = (id) => {
    if (window.confirm("회원 탈퇴를 정말로 하시겠습니까?")) {
      auth //
        .withDrawal(id)
        .then(() => console.log("회원 탈퇴 완료"));
    }
  };
  const onSignup = (signupForm) => {
    auth.signup(signupForm);
  };
  const onLogin = (loginForm) => {
    auth.login(loginForm).then((user) => {
      setUser(user);
      localStorage.clear();
      localStorage.setItem("id", user.id);
    });

    // if (
    //   users[0].userid === loginForm.userid &&
    //   users[0].userpassword === loginForm.userpassword
    // ) {
    //   props.auth
    //     .login(loginForm)
    //     .then((result) => console.log(JSON.stringify(result)));
    //   setUser(users[0]);
    //   localStorage.setItem("userid", users[0].id);
    //   localStorage.setItem("username", users[0].username);
    // } else {
    //   alert("없는 회원");
    // }
  };
  const onLogout = () => {
    setUser({
      // id: "",
      // userid: "",
      // useremail: "",
      // userpassword: "",
      // username: "",
      // enabled: "",
    });
    localStorage.clear();
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
          <Route
            path="/"
            exact
            element={<Home user={user.username} onLogout={onLogout} />}
          />
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
                user={user.username}
                onChange={onMypageChange}
                onwithDrawal={onwithDrawal}
              />
            }
          />
          <Route
            path="/myboards"
            exact
            element={<Myboards user={user.username} boardApi={boardApi} />}
          />
          <Route
            path="/findId"
            exact
            element={<FindId user={user.username} onFindId={onFindId} />}
          />
          <Route
            path="/findPw"
            exact
            element={<FindPw user={user.username} onFindPw={onFindPw} />}
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
            element={<Recipe user={user.username} boardApi={boardApi} />}
          />
          <Route
            path="/restaurant"
            exact
            element={<Restaurant user={user.username} boardApi={boardApi} />}
          />
          <Route
            path="/free"
            exact
            element={<Free user={user.username} boardApi={boardApi} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
