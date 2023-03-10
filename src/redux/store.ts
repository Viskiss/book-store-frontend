import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
// import { createLogger } from 'redux-logger';

import userReduser from 'src/redux/userStore/userSlice';
import bookReduser from 'src/ui/pages/BookStoreMain/redux/bookStoreSlice';

import { isDev } from '../utils/config';

// const logger = createLogger({
//   collapsed: true,
//   predicate: (_getState, action) => action.type.includes('book'),
// });

const store = configureStore({
  reducer: {
    userStore: userReduser,
    bookStore: bookReduser,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: isDev,
});

type AppDispatchType = typeof store.dispatch;
export type StateType = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector;
export const useAppDispatch: () => AppDispatchType = useDispatch;

export default store;
