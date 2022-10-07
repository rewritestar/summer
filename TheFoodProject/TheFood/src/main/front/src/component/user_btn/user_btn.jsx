import Button from "../button/button";
import styles from "./user_btn.module.css";
import { BiUserCircle } from "react-icons/bi";
import { useEffect, useState } from "react";
const UserBtn = ({ user, goToLogin, goToSignup, goToMypage, onLogout }) => {
  // const [user, setUser] = useState();
  // const token = localStorage.getItem("token");
  // useEffect(() => {
  //   const tokenForm = { token };
  //   console.log(tokenForm);
  //   token &&
  //     auth
  //       .stayLogin(tokenForm) //
  //       .then((user) => {
  //         console.log(user);
  //         setUser(user);
  //       })
  //       .catch((e) => {
  //         console.log("token error");
  //         setUser();
  //       });
  // }, []);
  return (
    <div className={styles.container}>
      <div className={styles.show}>
        <BiUserCircle className={styles.icon} />
      </div>
      <div className={styles.member_container}>
        {!user && (
          <div className={styles.nonMember}>
            <Button title="로그인" onClick={goToLogin} />
            <Button title="회원가입" onClick={goToSignup} />
          </div>
        )}
        {user && (
          <div className={styles.member}>
            <span className={styles.user_name}>
              {user.username}님! 환영합니다.
            </span>
            <Button title="로그아웃" onClick={onLogout} />
            <Button title="마이 페이지" onClick={goToMypage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBtn;
