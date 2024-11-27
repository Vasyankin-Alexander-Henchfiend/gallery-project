import { TAuthor, TData, TPicture } from "../components/types/types";

export const BASE_URL: string = "https://test-front.framework.team";
export const PICTURE_PER_PAGE: number = 6;

//Функция для получения количества страниц пагинации
export const getTotalPageCount = (rowCount: number, limit: number): number =>
  Math.ceil(rowCount / limit);


// Функция для получения чистых данных по значению ключа в объекте
export function getPureArray<T>(array: T[] | undefined, value: keyof T) {
  return array?.map((item) => item[value]);
}

export function getData(pictures: TPicture[], authors: TAuthor[]) {
  const array: TData[] = [];
  authors.map((item) => {
    const id = item.id;
    const authorName = item.name;
    let math = null;
    const results = pictures.filter((item) => item.authorId === id);
    results.map((item) => {
      math = { ...item, authorName };
      if (math !== null) {
        array.push(math);
      }
    });
  });
  console.log(array);
  return array;
}

