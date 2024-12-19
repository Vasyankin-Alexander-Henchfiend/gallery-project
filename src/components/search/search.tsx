import { IconButton } from '../../ui/icon-button/icon-button'
import styles from './search.module.scss'

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  placeholder?: string
  filterIconClick: () => void
  closedIconClick: () => void
  value: string
}

export const Search: React.FC<InputProps> = ({
  placeholder = '',
  type = 'search',
  filterIconClick,
  closedIconClick,
  value,
  ...rest
}) => {
  return (
    <div className={styles.search}>
      <form className={styles.form}>
        <input
          type={type}
          placeholder={placeholder}
          className={styles.input}
          value={value}
          {...rest}
        />
        {value != '' && (
          <IconButton
            extraClassButton={styles[`closed-button`]}
            extraClassIcon={styles[`closed-icon`]}
            onClick={closedIconClick}
          />
        )}
      </form>
      <IconButton
        extraClassButton={styles[`filter-button`]}
        extraClassIcon={styles[`filter-icon`]}
        onClick={filterIconClick}
      />
    </div>
  )
}
