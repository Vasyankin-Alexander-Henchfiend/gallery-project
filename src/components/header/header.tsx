import styles from './header.module.css';
import logo from '../../images/logo.png';
import themeIcon from '../../images/dark_icon.png';
import React from 'react';

export const Header: React.FC = () => {
    return (
      <header className={styles.header}>
        <img src={logo} className={styles.logo}></img>
        <div className={styles[`theme-icon-wrapper`]}>
          <img src={themeIcon} className={styles[`theme-icon`]}></img>
        </div>
      </header>
    );
}