import { Input } from '../input/input'
import styles from './years-form.module.scss'

export const YearsForm = () => {
  return (
    <form className={styles.form}>
      <Input
        extraClass={styles.input}
        placeholder="From"
        maxLength={4}
        type="text"
      />
      <div className={styles.icon}></div>
      <Input
        extraClass={styles.input}
        placeholder="To"
        maxLength={4}
        type="text"
      />
    </form>
  )
}
