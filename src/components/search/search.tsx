import styles from "./search.module.css";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  placeholder?: string;
}

export const Search: React.FC<InputProps> = ({
  placeholder = "Painting title",
  type = "text",
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
        <div className={styles[`filter-icon`]} />
      </button>
    </div>
  );
};
