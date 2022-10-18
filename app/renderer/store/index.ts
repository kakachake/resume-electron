import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger';
import global from './slice/global';
import resume from './slice/resume';
import template from './slice/template';
import thunk from 'redux-thunk';
import theme from './slice/theme';

export const store = configureStore({
  reducer: {
    global,
    resume,
    template,
    theme,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, thunk),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
