import styles from './header.module.scss'
import logo from '../app/assets/images/logo.svg'
import React from 'react'
import { ThemeButton } from '../theme-button/theme-button'

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <a href="https://framework.team/">
        <img src={logo} className={styles.logo}></img>
      </a>
      <ThemeButton />
    </header>
  )
}
