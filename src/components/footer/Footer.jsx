import React from "react";
import styles from "./Footer.module.scss";

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p>&copy; {year} All Rights Reserved</p>
    </div>
  );
};

export default Footer;
