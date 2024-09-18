import styles from './pagination.module.css'

type TPaginationProps = {
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  disable: {
    left: boolean;
    right: boolean;
  };
  nav?: {
    current: number;
    total: number;
  };
};

export const Pagination = (props: TPaginationProps) => {
    const { nav = null, disable, onNextPageClick, onPrevPageClick } = props;

    const handleNextPageClick = () => {
        onNextPageClick()
    }

    const handlePrevPageClick = () => {
        onPrevPageClick();
    };

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
           <span className={styles.navigation}>
             {nav.current} / {nav.total}
           </span>
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