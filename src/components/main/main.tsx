import React, { useCallback, useEffect, useState } from 'react';
import styles from './main.module.css';
import { Pagination } from '../pagination/pagination';
import { Search } from '../search/search';
import { useGetDataTotalQuery, useGetPageQuery } from '../../api/axiosExemple';
import { TPicture } from '../types/types';
import { Picture } from '../picture/picture';

const PICTURE_PER_PAGE = 6;

const getTotalPageCount = (rowCount: number): number =>
  Math.ceil(rowCount / PICTURE_PER_PAGE);


export const Main: React.FC = () => {
  
  const [page, setPage] = useState<number>(1);
  const [picturesTotal, setPicturesTotal] = useState<number>(0);
  const { data: picturesSum } = useGetDataTotalQuery('');
  const { data, error, isLoading } = useGetPageQuery(page); 

  useEffect(() => {
    if (picturesSum) {
      return setPicturesTotal(picturesSum.length)
    }
  }, [data, picturesSum]);

  const handleNextPageClick = useCallback(() => {
    const current = page;
    const next = current + 1;
    const total = data ? getTotalPageCount(picturesTotal) : current;

    setPage(next <= total ? next : current);
  }, [page, data, picturesTotal]);

  const handlePrevPageClick = useCallback(() => {
    const current = page;
    const prev = current - 1;

    setPage(prev > 0 ? prev : current);
  }, [page]);

  const handleNumberPageClick = useCallback(
    (page: number) => {
      setPage(page);
    },
    []
  );

  return (
    <main className={styles.main}>
      <Search />
      <section className={styles.gallery}>
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          data.map((item: TPicture, index: number) => {
            return <Picture item={item} key={index} />;
          })
        ) : null}
      </section>
      <Pagination
        onNextPageClick={handleNextPageClick}
        onPrevPageClick={handlePrevPageClick}
        onNumberPageClick={handleNumberPageClick}
        disable={{
          left: page === 1,
          right: page === getTotalPageCount(picturesTotal),
        }}
        nav={{ current: page, total: getTotalPageCount(picturesTotal) }}
      />
    </main>
  );
};