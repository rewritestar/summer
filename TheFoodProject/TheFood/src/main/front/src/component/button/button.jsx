import React from "react";
import styles from "./button.module.css";
const Button = ({ title, onClick }) => (
  <button className={styles.button} onClick={onClick}>
    {title}
  </button>
);

export default Button;
