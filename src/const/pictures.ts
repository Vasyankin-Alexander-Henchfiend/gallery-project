export const BASE_URL: string = "https://test-front.framework.team";
export const PICTURE_PER_PAGE: number = 6;

//Функция для получения количества страниц пагинации
export const getTotalPageCount = (rowCount: number, limit: number): number =>
  Math.ceil(rowCount / limit);


// Функция для получения чистых данных по значению ключа в объекте
export function getPureArray<T>(array: T[] | undefined, value: keyof T) {
  return array?.map((item) => item[value]);
}
