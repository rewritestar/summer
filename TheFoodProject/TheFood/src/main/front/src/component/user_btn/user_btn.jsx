import { useNavigate } from "react-router-dom";
import Button from "../button/button";
import styles from "./user_btn.module.css";

const UserBtn = ({ user }) => {
  const navigate = useNavigate();
  const onLogout = () => {
    navigate("/", { state: "logout" });
  };
  const goToLogin = () => {
    navigate("/login");
  };
  const goToSignup = () => {
    navigate("/signup");
  };
  const goToMypage = () => {
    navigate("/mypage");
  };
  return (
    <div className={styles.container}>
      <div className={styles.show}></div>
      <div className={styles.member_container}>
        {!user && (
          <div className={styles.nonMember}>
            <Button title="로그인" onClick={goToLogin} />
            <Button title="회원가입" onClick={goToSignup} />
          </div>
        )}
        {user && (
          <div className={styles.member}>
            <span className={styles.user_name}>{user}님! 환영합니다.</span>
            <Button title="로그아웃" onClick={onLogout} />
            <Button title="마이 페이지" onClick={goToMypage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBtn;