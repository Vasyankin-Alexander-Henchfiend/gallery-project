import styles from "./header.module.scss";
import logo from "../app/assets/images/logo.svg";
import React from "react";
import { IconButton } from "../../ui/icon-button/icon-button";

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <a href="https://framework.team/">
        <img src={logo} className={styles.logo}></img>
      </a>
      <IconButton
        extraClassButton={styles[`theme-button`]}
        extraClassIcon={styles[`theme-icon`]}
        onClick={() => null}
      />
    </header>
  );
};
