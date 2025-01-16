import React from 'react'
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks'
import cn from 'classnames'
import styles from './theme-button.module.scss'
import { set } from '../../services/slices/theme'
import { IconButton } from '../../ui/icon-button/icon-button'

interface IThemeButton {
  className?: string
}

//компонент содержит пропс класса для возможного внесения дополнительных стилистических изменений
export const ThemeButton: React.FC<IThemeButton> = ({ className }) => {
  const theme = useAppSelector((store) => store.theme)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const handleChange = () => dispatch(set(theme === 'dark' ? 'light' : 'dark'))

  return (
    <IconButton
      extraClassButton={styles[`theme-button`]}
      extraClassIcon={cn(
        className,
        styles[`theme-icon`],
        theme === 'dark' ? styles.dark : styles.light,
      )}
      onClick={handleChange}
    />
  )
}
