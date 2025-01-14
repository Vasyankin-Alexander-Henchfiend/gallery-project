import React from 'react'
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks'
import cn from 'classnames'
import styles from './theme.module.scss'
import { set } from '../../services/slices/theme'

interface ITheme {
  className?: string
}

export const Theme: React.FC<ITheme> = ({ className }) => {
  const theme = useAppSelector((store) => store.theme)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const handleChange = () => dispatch(set(theme === 'dark' ? 'light' : 'dark'))

  return (
    <div
      className={cn(
        className,
        styles.root,
        theme === 'dark' ? styles.dark : styles.light,
      )}
      onClick={handleChange}
    />
  )
}
