//Функция для получения количества страниц пагинации
export const getTotalPageCount = (rowCount: number, limit: number): number =>
  Math.ceil(rowCount / limit);

// Функция для получения нового однотипного массива
export function getPureArray<T>(array: T[] | undefined, value: keyof T, id: keyof T) {
  return array?.map((item) => {return { id: item[id], label: item[value]}});
}
