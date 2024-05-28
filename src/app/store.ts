import { AuthService } from '../api/AuthService';      
import { configureStore } from '@reduxjs/toolkit';
import commonSlice from './commonSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    common: commonSlice,
    [AuthService.reducerPath]: AuthService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      AuthService.middleware,
    )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
