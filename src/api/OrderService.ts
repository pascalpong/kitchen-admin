import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithToken } from './baseQuery';

export const OrderService = createApi({
    reducerPath: 'OrderService',
    baseQuery: baseQueryWithToken,
    endpoints: (builder) => ({
      getOrders: builder.query<any, any>({
        query: () => ({
          url: '/order',
          method: 'GET'
        })
      }),
      createOrders: builder.mutation<any, any>({
        query: (body) => ({
          url: '/order/create',
          method: 'POST',
          body
        })
      })
    })
});
  
export const { useGetOrdersQuery, useCreateOrdersMutation } = OrderService;