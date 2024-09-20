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
              <button  key={index} className={styles.navigation}>
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