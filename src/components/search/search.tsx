import styles from "./search.module.scss";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  placeholder?: string;
}

export const Search: React.FC<InputProps> = ({
  placeholder = "",
  type = "search",
  ...rest
}) => {
  return (
    <div className={styles.search}>
      <input
        type={type}
        placeholder={placeholder}
        className={styles.input}
        {...rest}
      />
      <button className={styles[`filter-button`]}>
        <i className={styles[`filter-icon`]} />
      </button>
    </div>
  );
};
