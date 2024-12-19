import styles from './years-form.module.scss'

export const YearsForm = () => {
  return (
    <form className={styles.form}>
      <input
        className={styles.input}
        placeholder="From"
        maxLength={4}
        type="text"
      />
      <div className={styles.icon}></div>
      <input
        className={styles.input}
        placeholder="To"
        maxLength={4}
        type="text"
      />
    </form>
  )
}
