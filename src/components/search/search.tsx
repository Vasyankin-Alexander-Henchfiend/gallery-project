import { IconButton } from "../../ui/icon-button/icon-button";
import styles from "./search.module.scss";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  placeholder?: string;
  filterIconClick: () => void;
}

export const Search: React.FC<InputProps> = ({
  placeholder = "",
  type = "search",
  filterIconClick,
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
      <IconButton
        extraClassButton={styles[`filter-button`]}
        extraClassIcon={styles[`filter-icon`]}
        onClick={filterIconClick}
      />
    </div>
  );
};
