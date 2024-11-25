import styles from "./pagination.module.scss";
import cn from "classnames";
import { IconButton } from "../../ui/icon-button/icon-button";
import { TPaginationProps } from "./pagination.types";

export const Pagination = (props: TPaginationProps) => {
  const {
    nav = null,
    disable,
    onNextPageClick,
    onPrevPageClick,
    onNumberPageClick,
  } = props;

  const handleNextPageClick = () => {
    onNextPageClick();
  };

  const handlePrevPageClick = () => {
    onPrevPageClick();
  };

  const handleNumberPageClick = (item: number) => {
    onNumberPageClick(item);
  };

  const pageNumbers = (number: number): number[] => {
    return Array.from({ length: number }, (v, i) => i + 1);
  };

  return (
    <div className={styles.paginator}>
      <IconButton
        extraClassButton={styles[`arrow-button`]}
        extraClassIcon={`${styles[`arrow-icon`]} ${styles[`arrow-icon-left`]}`}
        onClick={handlePrevPageClick}
        disabled={disable.left}
      />
      {nav &&
        pageNumbers(nav.total).map((item, index) => {
          return (
            <button
              onClick={() => handleNumberPageClick(item)}
              key={index}
              className={cn(
                styles.navigation,
                nav.current === index + 1 ? styles.choosen : styles.default
              )}
            >
              <span className={cn(styles.number, nav.current === index + 1 && styles.choosen)}>{item}</span>
            </button>
          );
        })}
      <IconButton
        extraClassButton={styles[`arrow-button`]}
        extraClassIcon={styles[`arrow-icon`]}
        onClick={handleNextPageClick}
        disabled={disable.right}
      />
    </div>
  );
};
