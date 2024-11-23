import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import styles from "./main.module.scss";
import { Pagination } from "../pagination/pagination";
import { Search } from "../search/search";
import { useGetDataTotalQuery, useGetPageQuery } from "../../api/api";
import { TPageLimit, TPicture } from "../types/types";
import { Picture } from "../picture/picture";
import { getTotalPageCount, PICTURE_PER_PAGE } from "../../const/pictures";
import { useAppDispatch } from "../../services/hooks/hooks";
import { openModal } from "../../services/slices/modal";

export const Main: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [picturesTotal, setPicturesTotal] = useState<number>(0);
  const dispatch = useAppDispatch();

  const query: TPageLimit = {
    _page: page,
    _limit: PICTURE_PER_PAGE,
    q: searchQuery,
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
    setSearchQuery(event.target.value);
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
      />
      {/* Списко картин */}
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
