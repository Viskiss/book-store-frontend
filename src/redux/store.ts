import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import bookStoreReduser from './bookStore/bookStoreSlice';

const store = configureStore({
  devTools: true,
  reducer: {
    bookData: bookStoreReduser,
  },
});

type AppDispatchType = typeof store.dispatch;
export type StateType = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector;
export const useAppDispatch: () => AppDispatchType = useDispatch;

export default store;
