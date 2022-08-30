import React from "react";
import styles from "./footer.module.css";

const Footer = ({ display }) => {
  const direction = display === "column" ? styles.column : styles.row;
  return (
    <div className={`${styles.data} ${direction}`}>
      <p className={styles.team}>Team: summer</p>
      <p className={styles.developer}>Developer: 조인미, 전수진</p>
    </div>
  );
};
export default Footer;
