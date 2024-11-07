import styles from './pagination.module.scss'
import { TPaginationProps } from './pagination.types';



export const Pagination = (props: TPaginationProps) => {
    const { nav = null, disable, onNextPageClick, onPrevPageClick, onNumberPageClick } = props;

    const handleNextPageClick = () => {
        onNextPageClick()
    }

    const handlePrevPageClick = () => {
        onPrevPageClick();
    };

    const handleNumberPageClick = (item: number) => {
      onNumberPageClick(item);
    }

    const pageNumbers = (number: number): number[] => {
      return (Array.from({ length: number }, (v, i) => i + 1));
    }

     return (
       <div className={styles.paginator}>
         <button
           className={styles.arrow}
           type="button"
           onClick={handlePrevPageClick}
           disabled={disable.left}
         >
           {"<"}
         </button>
         {nav && (
          pageNumbers(nav.total).map((item, index) => {
            return (
              <button onClick={() => handleNumberPageClick(item)}  key={index} className={styles.navigation}>
                <span>{item}</span>
              </button>
            );
          })
         )}
         <button
           className={styles.arrow}
           type="button"
           onClick={handleNextPageClick}
           disabled={disable.right}
         >
           {">"}
         </button>
       </div>
     );
}