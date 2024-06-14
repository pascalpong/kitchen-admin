import { AuthService } from '@/api/AuthService';      
import { configureStore } from '@reduxjs/toolkit';
import commonSlice from './commonSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { AuthVerifyService } from '@/api/AuthVerifyService';
import { UserService } from '@/api/UserService';
import { CategoryService } from '@/api/CategoryService';
import { OrderService } from '@/api/OrderService';
import { LotService } from '@/api/LotService';
import { BillService } from '@/api/BillService';
import { ScanService } from '@/api/ScanService';

export const store = configureStore({
  reducer: {
    common: commonSlice,
    [AuthService.reducerPath]: AuthService.reducer,
    [AuthVerifyService.reducerPath]: AuthVerifyService.reducer,
    [UserService.reducerPath]: UserService.reducer,
    [CategoryService.reducerPath]: CategoryService.reducer,
    [OrderService.reducerPath]: OrderService.reducer,
    [LotService.reducerPath]: LotService.reducer,
    [BillService.reducerPath]: BillService.reducer,
    [ScanService.reducerPath]: ScanService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      AuthService.middleware,
      AuthVerifyService.middleware,
      UserService.middleware,
      CategoryService.middleware,
      OrderService.middleware,
      LotService.middleware,
      BillService.middleware,
      ScanService.middleware,
    )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
