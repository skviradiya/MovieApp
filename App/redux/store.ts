import { configureStore } from '@reduxjs/toolkit';
import movieSlice from './slices/movieSlice';
import userSlice from './slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    user: userSlice,
    movie: movieSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
