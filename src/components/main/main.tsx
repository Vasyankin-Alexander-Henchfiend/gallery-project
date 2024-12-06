import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import styles from "./main.module.scss";
import { Pagination } from "../pagination/pagination";
import { Search } from "../search/search";
import { useGetDataTotalQuery, useGetPageQuery } from "../../api/api";
import { TPageLimit, TPicture } from "../types/types";
import { Picture } from "../picture/picture";
import { PICTURE_PER_PAGE } from "../../const/consts";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import { openModal } from "../../services/slices/modal";
import { getTotalPageCount } from "../../const/utils";
import { getQuery } from "../../services/slices/query";

export const Main: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const {
    query: searchQuery,
    authorId,
    locationId,
    yearFrom,
    yearTo,
  } = useAppSelector((store) => store.query);
  const [picturesTotal, setPicturesTotal] = useState<number>(0);
  const dispatch = useAppDispatch();

  const query: TPageLimit = {
    _page: page,
    _limit: PICTURE_PER_PAGE,
    created_gte: yearFrom,
    created_lte: yearTo,
    q: searchQuery,
    authorId: authorId,
    locationId: locationId,
  };

  const { data: picturesSum } = useGetDataTotalQuery(query);
  const { data, error, isLoading } = useGetPageQuery(query);

  // Получаем общее количество картин, для отображения пагинации
  useEffect(() => {
    if (picturesSum) {
      return setPicturesTotal(picturesSum.length);
    }
  }, [data, picturesSum]);

  // Получаем значение поля поиска по названию картины
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(getQuery(event.target.value));
  };

  const handleNextPageClick = useCallback(() => {
    const current = page;
    const next = current + 1;
    const total = data
      ? getTotalPageCount(picturesTotal, PICTURE_PER_PAGE)
      : current;

    setPage(next <= total ? next : current);
  }, [page, data, picturesTotal]);

  const handlePrevPageClick = useCallback(() => {
    const current = page;
    const prev = current - 1;

    setPage(prev > 0 ? prev : current);
  }, [page]);

  const handleNumberPageClick = useCallback((page: number) => {
    setPage(page);
  }, []);

  return (
    <main className={styles.main}>
      {/* Компонент Поле поиска по названию */}
      <Search
        placeholder="Painting title"
        value={searchQuery}
        onChange={onChange}
        filterIconClick={() => dispatch(openModal())}
        closedIconClick={() => dispatch(getQuery(""))}
      />
      {/* Спискок картин */}
      <ul className={styles.gallery}>
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          data.map((item: TPicture, index: number) => {
            return <Picture item={item} key={index} />;
          })
        ) : null}
      </ul>
      {/* Компонент пагинация для переключения страниц с картинами */}
      <Pagination
        onNextPageClick={handleNextPageClick}
        onPrevPageClick={handlePrevPageClick}
        onNumberPageClick={handleNumberPageClick}
        disable={{
          left: page === 1,
          right: page === getTotalPageCount(picturesTotal, PICTURE_PER_PAGE),
        }}
        nav={{
          current: page,
          total: getTotalPageCount(picturesTotal, PICTURE_PER_PAGE),
        }}
      />
    </main>
  );
};
