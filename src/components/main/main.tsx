import React, { useCallback, useEffect, useState } from 'react';
import styles from './main.module.css';
import { Picture } from '../picture/picture';
import { TPicture } from '../types/types';
import { getPictures, getPicturesTotal } from '../../api/api';
import { Pagination } from '../pagination/pagination';
import { Search } from '../search/search';

const PICTURE_PER_PAGE = 6;

const getTotalPageCount = (rowCount: number): number =>
  Math.ceil(rowCount / PICTURE_PER_PAGE);


export const Main: React.FC = () => {
  const [data, setData] = useState<TPicture[] | []>([]);
  const [page, setPage] = useState<number>(1);
  const [picturesTotal, setPicturesTotal] = useState<number>(0)

  useEffect(() => {
    getPicturesTotal().then((data) => setPicturesTotal(data))
    getPictures(page).then((data) => setData(data));
  }, [page]);

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
        {data.map((item: TPicture, index: number) => {
          return <Picture item={item} key={index} />;
        })}
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