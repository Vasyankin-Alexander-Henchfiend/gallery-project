import styles from './input.module.scss'

interface Input {
  extraClass?: string
}

export const Input = ({ extraClass = '', ...rest }) => {
  return <input className={`${styles.input} ${extraClass}`} {...rest}></input>
}
