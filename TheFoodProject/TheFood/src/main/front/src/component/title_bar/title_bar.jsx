import React from "react";
import styles from "./title_bar.module.css";
const TitleBar = ({ title }) => (
  <div className={styles.container}>
    <p className={styles.title}>{title}</p>
  </div>
);

export default TitleBar;
