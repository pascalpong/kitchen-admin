import { AuthService } from '@/api/AuthService';      
import { configureStore } from '@reduxjs/toolkit';
import commonSlice from './commonSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { AuthVerifyService } from '@/api/AuthVerifyService';

export const store = configureStore({
  reducer: {
    common: commonSlice,
    [AuthService.reducerPath]: AuthService.reducer,
    [AuthVerifyService.reducerPath]: AuthVerifyService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      AuthService.middleware,
      AuthVerifyService.middleware,
    )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
