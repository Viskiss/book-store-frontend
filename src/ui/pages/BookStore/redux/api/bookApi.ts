import type { AxiosRequestConfig } from 'axios';

import type { GenreType, BookType, FilterType } from 'src/types';

import api from 'src/api/api';

const BOOK_PATH_PREFIX = '/book';

type GetFilteredBooksType = {
  books: BookType[];
  counterBooks: number;
  numberPages: number;
};

const getAllBooks = () => {
  return api.get<{books: BookType[]}>(`${BOOK_PATH_PREFIX}/books`);
};

const getRecommendedBooks = (userId: number) => {
  return api.get<{books: BookType[]}>(`${BOOK_PATH_PREFIX}/recommend/${userId}`);
};

const getAllGernes = () => {
  return api.get<{genres: GenreType[]}>(`${BOOK_PATH_PREFIX}/gernes`);
};

const getSelectBook = (bookId: number) => {
  return api.get<{book: BookType}>(`${BOOK_PATH_PREFIX}/${bookId}`);
};

const getFilterBooks = (filters: FilterType) => {
  return api.get<GetFilteredBooksType>(`${BOOK_PATH_PREFIX}/filter`, { params: { ...filters } }as AxiosRequestConfig);
};

export default {
  getAllBooks,
  getSelectBook,
  getAllGernes,
  getFilterBooks,
  getRecommendedBooks,
};
