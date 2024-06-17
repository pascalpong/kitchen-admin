import { AuthService } from '@/api/AuthService';
import { configureStore } from '@reduxjs/toolkit';
import commonSlice from './commonSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { AuthVerifyService } from '@/api/AuthVerifyService';
import { UserService } from '@/api/UserService';
import { CategoryService } from '@/api/CategoryService';
import { ItemService } from '@/api/ItemService';

export const store = configureStore({
  reducer: {
    common: commonSlice,
    [AuthService.reducerPath]: AuthService.reducer,
    [AuthVerifyService.reducerPath]: AuthVerifyService.reducer,
    [UserService.reducerPath]: UserService.reducer,
    [CategoryService.reducerPath]: CategoryService.reducer,
    [ItemService.reducerPath]: ItemService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      AuthService.middleware,
      AuthVerifyService.middleware,
      UserService.middleware,
      CategoryService.middleware,
      ItemService.middleware,
    )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
