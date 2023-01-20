import type { FilterType } from 'types/typesBooks';
import type { GenreType, BookType } from 'types';
import api from 'api/api';

const AUTH_PATH_PREFIX = '/book';

const getAllBooks = () => {
  return api.get<{books: BookType[]}>(`${AUTH_PATH_PREFIX}/books`);
};

const getAllGernes = () => {
  return api.get<{genres: GenreType[]}>(`${AUTH_PATH_PREFIX}/gernes`);
};

const getSelectBook = (bookId: number) => {
  return api.get<{book: BookType}>(`${AUTH_PATH_PREFIX}/${bookId}`);
};

const getFilterBooks = (filters: FilterType) => {
  return api.post<{books: BookType[]}>(`${AUTH_PATH_PREFIX}/filter`, {
    genre: filters.genre,
    select: filters.select,
  });
};

export default {
  getAllBooks,
  getSelectBook,
  getAllGernes,
  getFilterBooks,
};
